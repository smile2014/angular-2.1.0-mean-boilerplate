import {StringMapWrapper} from '@angular/core/src/facade/collection';

export interface GuinessCompatibleSpy extends jasmine.Spy {
  /** By chaining the spy with and.returnValue, all calls to the function will return a specific
   * value. */
  andReturn(val: any): void;
  /** By chaining the spy with and.callFake, all calls to the spy will delegate to the supplied
   * function. */
  andCallFake(fn: Function): GuinessCompatibleSpy;
  /** removes all recorded calls */
  reset(): any;
}

export class SpyObject {
  constructor(type: any = null) {
    if (type) {
      for (var prop of type.prototype) {
        var m: any = null;
        try {
          m = type.prototype[prop];
        } catch (e) {
          // As we are creating spys for abstract classes,
          // these classes might have getters that throw when they are accessed.
          // As we are only auto creating spys for methods, this
          // should not matter.
        }
        if (typeof m === 'function') {
          this.spy(prop);
        }
      }
    }
  }
  // Noop so that SpyObject has the same interface as in Dart
  noSuchMethod(args: any) {}

  spy(name: any) {
    if (!this[name]) {
      this[name] = this._createGuinnessCompatibleSpy(name);
    }
    return this[name];
  }

  prop(name: any, value: any) { this[name] = value; }

  static stub(object: any = null, config: any = null, overrides: any = null) {
    if (!(object instanceof SpyObject)) {
      overrides = config;
      config = object;
      object = new SpyObject();
    }

    var m = StringMapWrapper.merge(config, overrides);
    StringMapWrapper.forEach(m, (value: any, key: any) => { object.spy(key).andReturn(value); });
    return object;
  }

  /** @internal */
  _createGuinnessCompatibleSpy(name: any): GuinessCompatibleSpy {
    var newSpy: GuinessCompatibleSpy = <any>jasmine.createSpy(name);
    newSpy.andCallFake = <any>newSpy.and.callFake;
    newSpy.andReturn = <any>newSpy.and.returnValue;
    newSpy.reset = <any>newSpy.calls.reset;
    // revisit return null here (previously needed for rtts_assert).
    newSpy.and.returnValue(null);
    return newSpy;
  }
}
