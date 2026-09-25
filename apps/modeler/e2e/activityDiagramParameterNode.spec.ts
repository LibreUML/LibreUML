/**
 * Activity parameter nodes (v1.1) — driven through the real canvas. A
 * parameter node is an object node on the activity's boundary plus a
 * direction (in/out/inout): it shares the object node's shape, brand,
 * classifier trace and modal, so this suite exercises only what v1.1 added
 * on top — the «in»/«out» tag, the palette tool (created facing IN), the
 * "Edit Parameter…" menu item + direction select, and the "not connected"
 * Problems Panel rule.
 */
import { test, expect, type Page } from '@playwright/test';

const SPEC = {
  standalone: false as const,
  activityName: 'Withdraw',
  classes: [{ id: 'cls-money', name: 'Money' }],
  nodes: [
    { id: 'p1', vnId: 'vn-p1', x: 80, y: 120, activityType: 'ACTIVITY_PARAMETER_NODE', name: 'amount', parameterDirection: 'IN' as const, classifierId: 'cls-money' },
    { id: 'a1', vnId: 'vn-a1', x: 400, y: 120, activityType: 'ACTION', name: 'Debit' },
  ],
};

const rect = (page: Page, id: string) => page.evaluate((i) => window.__libreumlE2E!.nodeRect(i), id);
const dump = (page: Page, c: string) => page.evaluate((cc) => window.__libreumlE2E!.modelDump(cc), c);
const texts = (page: Page) => page.evaluate(() => window.__libreumlE2E!.stageTexts());
const viewNodeIds = (page: Page) =>
  page.evaluate(() => (window.__libreumlE2E!.getView()?.nodes ?? []).map((n) => n.id));

/** Same native-DragEvent workaround as activityDiagramCreation.spec.ts —
 *  Playwright's dragTo()/locator-based drag hangs against Konva's <canvas>. */
async function dragToolOntoCanvas(page: Page, toolTitle: string, drop: { x: number; y: number }) {
  await page.evaluate(
    ({ toolTitle, drop }) => {
      const source = document.querySelector<HTMLElement>(`[title="${toolTitle}"]`);
      const target = document.querySelector<HTMLCanvasElement>('canvas');
      if (!source || !target) throw new Error(`drag source or target not found (${toolTitle})`);
      const r = target.getBoundingClientRect();
      const clientX = r.left + drop.x;
      const clientY = r.top + drop.y;
      const dataTransfer = new DataTransfer();
      source.dispatchEvent(new DragEvent('dragstart', { bubbles: true, cancelable: true, dataTransfer }));
      target.dispatchEvent(new DragEvent('dragover', { bubbles: true, cancelable: true, dataTransfer, clientX, clientY }));
      target.dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer, clientX, clientY }));
      source.dispatchEvent(new DragEvent('dragend', { bubbles: true, cancelable: true, dataTransfer }));
    },
    { toolTitle, drop },
  );
}

async function seed(page: Page) {
  await page.goto('/__e2e');
  await page.waitForFunction(() => !!window.__libreumlE2E);
  await page.evaluate((s) => window.__libreumlE2E!.seedActivity(s), SPEC);
  await page.waitForFunction(() => {
    const r = window.__libreumlE2E?.nodeRect('vn-p1');
    return !!r && r.width > 0;
  });
  // The palette lives behind the "Modeling Tools" tab — closed by default.
  await page.locator('[title="Modeling Tools"]').click();
}

test.describe('v1.1 — activity parameter nodes', () => {
  test.beforeEach(async ({ page }) => seed(page));

  test('renders the name, the «in» direction tag and the classifier caption', async ({ page }) => {
    const t = await texts(page);
    expect(t.some((s) => s.includes('amount'))).toBe(true);
    expect(t.some((s) => s.includes('«in»'))).toBe(true);
    expect(t.some((s) => s.includes('[Money]'))).toBe(true);
  });

  test('dragging "Parameter" from the palette creates a real ACTIVITY_PARAMETER_NODE facing IN', async ({ page }) => {
    const before = await viewNodeIds(page);

    await dragToolOntoCanvas(page, 'Parameter', { x: 300, y: 400 });

    await expect.poll(async () => (await viewNodeIds(page)).length).toBeGreaterThan(before.length);
    const newVnId = (await viewNodeIds(page)).find((id) => !before.includes(id))!;
    const view = await page.evaluate(() => window.__libreumlE2E!.getView());
    const elementId = view!.nodes.find((n) => n.id === newVnId)!.elementId;
    const nodes = (await dump(page, 'activityNodes')) as Record<string, { activityType: string; parameterDirection?: string }>;
    expect(nodes[elementId]).toMatchObject({ activityType: 'ACTIVITY_PARAMETER_NODE', parameterDirection: 'IN' });
  });

  test('"Edit Parameter…" changes the direction, persists it and updates the tag', async ({ page }) => {
    const r = (await rect(page, 'vn-p1'))!;
    await page.mouse.click(r.x + r.width / 2, r.y + r.height / 2, { button: 'right' });
    await page.getByRole('button', { name: 'Edit Parameter…' }).click();

    await expect(page.getByText('Parameter Node Properties')).toBeVisible();
    await page.getByTestId('parameter-direction').selectOption('OUT');
    await page.getByRole('button', { name: 'Save' }).click();

    await expect.poll(async () => {
      const nodes = (await dump(page, 'activityNodes')) as Record<string, { parameterDirection?: string }>;
      return nodes['p1']?.parameterDirection;
    }).toBe('OUT');
    await expect.poll(async () => (await texts(page)).some((s) => s.includes('«out»'))).toBe(true);
  });

  test('a parameter node no flow touches surfaces a Problems Panel warning', async ({ page }) => {
    await page.getByTitle('Show Bottom Panel').click();
    await page.getByRole('button', { name: /Problems/ }).click();

    await expect(page.getByText('Parameter node "amount" is not connected to any flow')).toBeVisible();
  });
});
