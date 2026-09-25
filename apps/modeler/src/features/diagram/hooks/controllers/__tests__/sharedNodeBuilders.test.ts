import { describe, it, expect } from 'vitest';
import {
  resolveSemanticElement,
  getAbsolutePosition,
} from '../sharedNodeBuilders';
import type {
  SemanticModel,
  ViewNode,
  IRClass,
  IRInterface,
  IREnum,
  IRPackage,
  IRActor,
  IRUseCase,
  IRSystemBoundary,
  IRUCModule,
  IRDomainEntity,
} from '../../../../../core/domain/vfs/vfs.types';

// ─── Minimal SemanticModel fixture ───────────────────────────────────────────

function makeModel(overrides: Partial<SemanticModel> = {}): SemanticModel {
  return {
    id: 'model-1',
    name: 'Test',
    version: '1',
    packages: {},
    classes: {},
    interfaces: {},
    enums: {},
    dataTypes: {},
    attributes: {},
    operations: {},
    actors: {},
    useCases: {},
    systemBoundaries: {},
    ucModules: {},
    domainEntities: {},
    domainAttributes: {},
    activityNodes: {},
    objectInstances: {},
    components: {},
    nodes: {},
    artifacts: {},
    relations: {},
    createdAt: 0,
    updatedAt: 0,
    ...overrides,
  };
}

function makeViewNode(overrides: Partial<ViewNode> = {}): ViewNode {
  return {
    id: 'vn-1',
    elementId: 'el-1',
    x: 100,
    y: 200,
    ...overrides,
  };
}

// ─── resolveSemanticElement ───────────────────────────────────────────────────

describe('resolveSemanticElement', () => {
  it('returns NOTE for empty elementId', () => {
    const model = makeModel();
    const result = resolveSemanticElement(model, '');
    expect(result.kind).toBe('NOTE');
    expect(result.element).toBeNull();
  });

  it('resolves a regular class', () => {
    const cls: IRClass = {
      id: 'cls-1',
      name: 'User',
      kind: 'CLASS',
      isAbstract: false,
      attributeIds: [],
      operationIds: [],
    };
    const model = makeModel({ classes: { 'cls-1': cls } });
    const result = resolveSemanticElement(model, 'cls-1');
    expect(result.kind).toBe('CLASS');
    expect(result.element).toBe(cls);
  });

  it('resolves an abstract class', () => {
    const cls: IRClass = {
      id: 'cls-2',
      name: 'Animal',
      kind: 'CLASS',
      isAbstract: true,
      attributeIds: [],
      operationIds: [],
    };
    const model = makeModel({ classes: { 'cls-2': cls } });
    const result = resolveSemanticElement(model, 'cls-2');
    expect(result.kind).toBe('ABSTRACT_CLASS');
    expect(result.element).toBe(cls);
  });

  it('resolves an interface', () => {
    const iface: IRInterface = {
      id: 'if-1',
      name: 'Serializable',
      kind: 'INTERFACE',
      operationIds: [],
    };
    const model = makeModel({ interfaces: { 'if-1': iface } });
    const result = resolveSemanticElement(model, 'if-1');
    expect(result.kind).toBe('INTERFACE');
    expect(result.element).toBe(iface);
  });

  it('resolves an enum', () => {
    const enm: IREnum = {
      id: 'en-1',
      name: 'Status',
      kind: 'ENUM',
      literals: [],
    };
    const model = makeModel({ enums: { 'en-1': enm } });
    const result = resolveSemanticElement(model, 'en-1');
    expect(result.kind).toBe('ENUM');
    expect(result.element).toBe(enm);
  });

  it('resolves a package', () => {
    const pkg: IRPackage = {
      id: 'pkg-1',
      name: 'com.example',
      kind: 'PACKAGE',
      packageIds: [],
      classIds: [],
      interfaceIds: [],
      enumIds: [],
      dataTypeIds: [],
    };
    const model = makeModel({ packages: { 'pkg-1': pkg } });
    const result = resolveSemanticElement(model, 'pkg-1');
    expect(result.kind).toBe('PACKAGE');
    expect(result.element).toBe(pkg);
  });

  it('resolves an actor', () => {
    const actor: IRActor = { id: 'ac-1', name: 'Customer', kind: 'ACTOR' };
    const model = makeModel({ actors: { 'ac-1': actor } });
    const result = resolveSemanticElement(model, 'ac-1');
    expect(result.kind).toBe('ACTOR');
    expect(result.element).toBe(actor);
  });

  it('resolves a use case', () => {
    const uc: IRUseCase = { id: 'uc-1', name: 'Login', kind: 'USECASE' };
    const model = makeModel({ useCases: { 'uc-1': uc } });
    const result = resolveSemanticElement(model, 'uc-1');
    expect(result.kind).toBe('USECASE');
    expect(result.element).toBe(uc);
  });

  it('resolves a system boundary', () => {
    const sb: IRSystemBoundary = { id: 'sb-1', name: 'MySystem', kind: 'SYSTEM_BOUNDARY' };
    const model = makeModel({ systemBoundaries: { 'sb-1': sb } });
    const result = resolveSemanticElement(model, 'sb-1');
    expect(result.kind).toBe('SYSTEM_BOUNDARY');
    expect(result.element).toBe(sb);
  });

  it('resolves a UC module', () => {
    const ucm: IRUCModule = { id: 'ucm-1', name: 'AuthModule', kind: 'UC_MODULE' };
    const model = makeModel({ ucModules: { 'ucm-1': ucm } });
    const result = resolveSemanticElement(model, 'ucm-1');
    expect(result.kind).toBe('UC_MODULE');
    expect(result.element).toBe(ucm);
  });

  it('resolves a domain entity', () => {
    const de: IRDomainEntity = {
      id: 'de-1',
      name: 'Order',
      kind: 'DOMAIN_ENTITY',
      attributeIds: [],
    };
    const model = makeModel({ domainEntities: { 'de-1': de } });
    const result = resolveSemanticElement(model, 'de-1');
    expect(result.kind).toBe('DOMAIN_ENTITY');
    expect(result.element).toBe(de);
  });

  it('returns UNKNOWN for unrecognised elementId', () => {
    const model = makeModel();
    const result = resolveSemanticElement(model, 'no-such-id');
    expect(result.kind).toBe('UNKNOWN');
    expect(result.element).toBeNull();
  });
});

// ─── getAbsolutePosition ─────────────────────────────────────────────────────

describe('getAbsolutePosition', () => {
  it('returns stored position for root-level nodes', () => {
    const viewNode = makeViewNode({ x: 50, y: 75 });
    const result = getAbsolutePosition(viewNode, [viewNode]);
    expect(result).toEqual({ x: 50, y: 75 });
  });

  it('adds parent position for nested nodes', () => {
    const parent = makeViewNode({ id: 'parent', elementId: 'p', x: 100, y: 200 });
    const child = makeViewNode({ id: 'child', elementId: 'c', x: 10, y: 20, parentPackageId: 'parent' });
    const result = getAbsolutePosition(child, [parent, child]);
    expect(result).toEqual({ x: 110, y: 220 });
  });

  it('handles missing parent gracefully', () => {
    const child = makeViewNode({ id: 'child', x: 30, y: 40, parentPackageId: 'ghost-parent' });
    const result = getAbsolutePosition(child, [child]);
    expect(result).toEqual({ x: 30, y: 40 });
  });

  it('resolves deeply nested positions recursively', () => {
    const grandparent = makeViewNode({ id: 'gp', elementId: 'gp', x: 100, y: 100 });
    const parent = makeViewNode({ id: 'p', elementId: 'p', x: 50, y: 50, parentPackageId: 'gp' });
    const child = makeViewNode({ id: 'c', elementId: 'c', x: 10, y: 10, parentPackageId: 'p' });
    const result = getAbsolutePosition(child, [grandparent, parent, child]);
    expect(result).toEqual({ x: 160, y: 160 });
  });
});
