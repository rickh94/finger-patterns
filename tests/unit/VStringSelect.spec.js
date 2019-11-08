import Vue from 'vue';
import VStringSelect from '../../src/components/VStringSelect.vue';
import EventBus from '../../src/eventbus';


describe('v-string-select', () => {
  let Constructor;
  beforeEach(() => {
    EventBus.$emit = jest.fn();
    Constructor = Vue.extend(VStringSelect);
  });
  it('Sets correct default data', () => {
    expect(typeof VStringSelect.data).toBe('function');
    const defaultData = VStringSelect.data();
    expect(defaultData.instrumentString).toBeUndefined();
  });

  it('sets the expected default from default props', () => {
    const vm = new Constructor({ propsData: { instrument: 'Violin' } }).$mount();
    expect(vm.instrumentString).toBe('A');
  });

  it('sets data from props', () => {
    const vm = new Constructor({ propsData: { instrument: 'Viola', selected: 'C' } }).$mount();
    expect(vm.instrument).toBe('Viola');
    expect(vm.instrumentString).toBe('C');
  });

  it('has the correct strings for Violin', () => {
    const vm = new Constructor({ propsData: { instrument: 'Violin' } }).$mount();
    expect(vm.$el.querySelector('#e-string')).not.toBeNull();
    expect(vm.$el.querySelector('#a-string')).not.toBeNull();
    expect(vm.$el.querySelector('#d-string')).not.toBeNull();
    expect(vm.$el.querySelector('#g-string')).not.toBeNull();
    expect(vm.$el.querySelector('#no-string')).not.toBeNull();
    expect(vm.$el.querySelector('#c-string')).toBeNull();
  });

  it('has the correct strings for Viola', () => {
    const vm = new Constructor({ propsData: { instrument: 'Viola' } }).$mount();
    expect(vm.$el.querySelector('#a-string')).not.toBeNull();
    expect(vm.$el.querySelector('#d-string')).not.toBeNull();
    expect(vm.$el.querySelector('#g-string')).not.toBeNull();
    expect(vm.$el.querySelector('#c-string')).not.toBeNull();
    expect(vm.$el.querySelector('#no-string')).not.toBeNull();
    expect(vm.$el.querySelector('#e-string')).toBeNull();
  });

  it('sets data on changed string and emits', () => {
    const vm = new Constructor({ propsData: { instrument: 'Violin', selected: 'A' } }).$mount();
    expect(vm.instrumentString).toBe('A');
    vm.$el.querySelector('#e-string').click();
    expect(vm.instrumentString).toBe('E');
    expect(EventBus.$emit).toHaveBeenCalledWith('instrumentStringChanged', 'E');
  });
});
