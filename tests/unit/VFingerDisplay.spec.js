import { mount } from '@vue/test-utils';
import VFingerDisplay from '../../src/components/VFingerDisplay.vue';
import EventBus from '../../src/eventbus';

const basicProps = {
  activeFinger: null,
  normalizedId: 'test-pattern',
  radius: 2,
  widths: [16, 4, 16, 16],
};

describe('v-finger-display', () => {
  const basicMount = () => mount(VFingerDisplay, { propsData: basicProps });
  beforeEach(() => {
    EventBus.$emit = jest.fn();
  });

  it('renders elements and sets ids correctly', () => {
    const vm = basicMount();
    expect(vm.find(`#${basicProps.normalizedId}-finger-pattern`).exists()).toBeTruthy();
    expect(vm.find(`#${basicProps.normalizedId}-finger-pattern-line`).exists()).toBeTruthy();
    expect(vm.find(`#${basicProps.normalizedId}-finger-1`).exists()).toBeTruthy();
    expect(vm.find(`#${basicProps.normalizedId}-finger-2`).exists()).toBeTruthy();
    expect(vm.find(`#${basicProps.normalizedId}-finger-3`).exists()).toBeTruthy();
    expect(vm.find(`#${basicProps.normalizedId}-finger-4`).exists()).toBeTruthy();
    expect(vm.find(`#${basicProps.normalizedId}-finger-1-text`).exists()).toBeTruthy();
    expect(vm.find(`#${basicProps.normalizedId}-finger-2-text`).exists()).toBeTruthy();
    expect(vm.find(`#${basicProps.normalizedId}-finger-3-text`).exists()).toBeTruthy();
    expect(vm.find(`#${basicProps.normalizedId}-finger-4-text`).exists()).toBeTruthy();
  });

  it('renders fingers correctly', () => {
    expect.assertions(17);
    const wrapper = basicMount();
    const circles = wrapper.findAll('circle');
    expect(circles.length).toEqual(4);
    circles.wrappers.forEach((circle) => {
      expect(parseInt(circle.attributes().r, 10)).toEqual(basicProps.radius);
      expect(circle.attributes().cy).toEqual('283.77081');
      expect(circle.classes()).toContain('finger');
      expect(circle.classes()).toContain('stroke-default');
    });
  });

  it('renders the cross line', () => {
    const wrapper = basicMount();
    const mainLine = wrapper.find('path');
    expect(mainLine).not.toBeNull();
    expect(mainLine.classes()).toContain('line');
    expect(mainLine.classes()).toContain('stroke-default');
  });

  describe('computes positions correctly', () => {
    const computeMount = () => mount(VFingerDisplay, {
      propsData: {
        ...basicProps,
        emptyStringLeft: 0,
      },
    });
    it('one', () => {
      const wrapper = computeMount();
      expect(wrapper.vm.oneXPos).toEqual(16);
      const fingerOne = wrapper.find(`#${basicProps.normalizedId}-finger-1`);
      expect(fingerOne.attributes().cx).toEqual('16');
      const fingerTextOne = wrapper.find(`#${basicProps.normalizedId}-finger-1-text`);
      expect(fingerTextOne.attributes().x).toEqual('14.8');
    });

    it('two', () => {
      const wrapper = computeMount();
      expect(wrapper.vm.twoXPos).toEqual(24);
      const fingerOne = wrapper.find(`#${basicProps.normalizedId}-finger-2`);
      expect(fingerOne.attributes().cx).toEqual('24');
      const fingerTextOne = wrapper.find(`#${basicProps.normalizedId}-finger-2-text`);
      expect(fingerTextOne.attributes().x).toEqual('22.7');
    });

    it('three', () => {
      const wrapper = computeMount();
      expect(wrapper.vm.threeXPos).toEqual(44);
      const fingerOne = wrapper.find(`#${basicProps.normalizedId}-finger-3`);
      expect(fingerOne.attributes().cx).toEqual('44');
      const fingerTextOne = wrapper.find(`#${basicProps.normalizedId}-finger-3-text`);
      expect(fingerTextOne.attributes().x).toEqual('42.6');
    });


    it('four', () => {
      const wrapper = mount(VFingerDisplay, { propsData: { ...basicProps, emptyStringLeft: 0 } });
      expect(wrapper.vm.fourXPos).toEqual(64);
      const fingerOne = wrapper.find(`#${basicProps.normalizedId}-finger-4`);
      expect(fingerOne.attributes().cx).toEqual('64');
      const fingerTextOne = wrapper.find(`#${basicProps.normalizedId}-finger-4-text`);
      expect(fingerTextOne.attributes().x).toEqual('62.5');
    });
  });

  describe('sets active finger correctly', () => {
    it('one', () => {
      const wrapper = basicMount();
      wrapper.find(`#${basicProps.normalizedId}-finger-1`).trigger('click');
      expect(wrapper.emitted().activeFingerChanged[0]).toEqual([1]);
    });

    it('two', () => {
      const wrapper = basicMount();
      wrapper.find(`#${basicProps.normalizedId}-finger-2`).trigger('click');
      expect(wrapper.emitted().activeFingerChanged[0]).toEqual([2]);
    });

    it('three', () => {
      const wrapper = basicMount();
      wrapper.find(`#${basicProps.normalizedId}-finger-3`).trigger('click');
      expect(wrapper.emitted().activeFingerChanged[0]).toEqual([3]);
    });

    it('four', () => {
      const wrapper = basicMount();
      wrapper.find(`#${basicProps.normalizedId}-finger-4`).trigger('click');
      expect(wrapper.emitted().activeFingerChanged[0]).toEqual([4]);
    });
  });

  describe('displays active finger correctly', () => {
    const activeFingerMount = activeFinger => mount(VFingerDisplay, {
      propsData: {
        ...basicProps,
        activeFinger,
      },
    });

    it('one', () => {
      const wrapper = activeFingerMount(1);
      expect(wrapper.find(`#${basicProps.normalizedId}-finger-1`).classes()).toContain('finger-active');
    });


    it('two', () => {
      const wrapper = activeFingerMount(2);
      expect(wrapper.find(`#${basicProps.normalizedId}-finger-2`).classes()).toContain('finger-active');
    });

    it('three', () => {
      const wrapper = activeFingerMount(3);
      expect(wrapper.find(`#${basicProps.normalizedId}-finger-3`).classes()).toContain('finger-active');
    });

    it('four', () => {
      const wrapper = activeFingerMount(4);
      expect(wrapper.find(`#${basicProps.normalizedId}-finger-4`).classes()).toContain('finger-active');
    });
  });
});
