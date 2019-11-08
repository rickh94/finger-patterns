import Vue from 'vue';
import VInstrumentSelect from '../../src/components/VInstrumentSelect.vue';
import EventBus from '../../src/eventbus';


describe('v-instrument-select', () => {
  let Constructor;
  beforeEach(() => {
    EventBus.$emit = jest.fn();
    Constructor = Vue.extend(VInstrumentSelect);
  });
  it('Sets correct default data', () => {
    expect(typeof VInstrumentSelect.data).toBe('function');
    const defaultData = VInstrumentSelect.data();
    expect(defaultData.instrument).toBeUndefined();
  });

  it('sets the expected default from default props', () => {
    const vm = new Constructor().$mount();
    expect(vm.instrument).toBe('Violin');
  });

  it('sets data from props', () => {
    const vm = new Constructor({ propsData: { selected: 'Viola' } }).$mount();
    expect(vm.instrument).toBe('Viola');
  });

  it('has the correct options', () => {
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('#violin')).not.toBeNull();
    expect(vm.$el.querySelector('#violin').value).toBe('Violin');
    expect(vm.$el.querySelector('#viola')).not.toBeNull();
    expect(vm.$el.querySelector('#viola').value).toBe('Viola');
  });

  it('sets data on changed string and emits', () => {
    const vm = new Constructor({ propsData: { instrument: 'Violin' } }).$mount();
    expect(vm.instrument).toBe('Violin');
    vm.$el.querySelector('#viola').click();
    expect(vm.instrument).toBe('Viola');
    expect(EventBus.$emit).toHaveBeenCalledWith('instrumentChanged', 'Viola');
  });
});
