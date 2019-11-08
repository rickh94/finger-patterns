import { mount } from '@vue/test-utils';
import abcjs from 'abcjs';
import flushPromises from 'flush-promises';
import EventBus from '../../src/eventbus';
import VNotesDisplay from '../../src/components/VNotesDisplay.vue';

const basicProps = {
  normalizedId: 'test-notes',
  clef: 'treble',
  notes: 'A B C D',
  raised: false,
};

abcjs.renderAbc = jest.fn();

describe('v-notes-display', () => {
  const basicMount = () => mount(VNotesDisplay, { propsData: basicProps });
  beforeEach(() => {
  });
  afterEach(() => {
    abcjs.renderAbc.mockRestore();
  });

  it('sets tune correctly', async () => {
    const wrapper = await basicMount();
    expect(wrapper.vm.tune).toBe(`
      X:1
      L: 1/4
      K: Cmaj clef=treble
      A B C D |
      `);
  });

  it('calls render function', async () => {
    const wrapper = await basicMount();
    await flushPromises();
    expect(abcjs.renderAbc).toHaveBeenCalledWith('test-notes-notes', `
      X:1
      L: 1/4
      K: Cmaj clef=treble
      A B C D |
      `, {
      scale: 1.1,
      staffwidth: 300,
      clickListener: wrapper.vm.onNoteClick,
      add_classes: true,
      paddingleft: 0,
      paddingright: 0,
      paddingbottom: 0,
      paddingtop: 0,
    });
  });

  it('calls reset selected on instrument change', async () => {
    const wrapper = await basicMount();
    const spy = jest.spyOn(wrapper.vm, 'resetSelected');
    await flushPromises();
    EventBus.$emit('instrumentChanged');
    expect(spy).toHaveBeenCalled();
  });

  it('calls reset selected on instrument string changed', async () => {
    const wrapper = await basicMount();
    const spy = jest.spyOn(wrapper.vm, 'resetSelected');
    await flushPromises();
    EventBus.$emit('instrumentStringChanged');
    expect(spy).toHaveBeenCalled();
  });

  it('handles active finger change in this element', async () => {
    const wrapper = await basicMount();
    const spy = jest.spyOn(wrapper.vm, 'resetSelected');
    await flushPromises();
    wrapper.vm.$el.querySelector = jest.fn();
    const fakeNote = document.createElement('div');
    wrapper.vm.$el.querySelector.mockReturnValue(fakeNote);
    EventBus.$emit('activeFingerChanged', { parentId: 'test-notes', finger: 3 });
    expect(wrapper.vm.$el.querySelector).toHaveBeenCalledWith('.abcjs-n2');
    expect(spy).toHaveBeenCalled();
    expect(fakeNote.classList).toContain('abcjs-note_selected');
  });

  it('handles active finger change in different element', async () => {
    const wrapper = await basicMount();
    const spy = jest.spyOn(wrapper.vm, 'resetSelected');
    await flushPromises();
    wrapper.vm.$el.querySelector = jest.fn();
    EventBus.$emit('activeFingerChanged', { parentId: 'test-notes2', finger: 3 });
    expect(wrapper.vm.$el.querySelector).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();
  });

  it('resetSelected behaves correctly', async () => {
    const wrapper = await basicMount();
    await flushPromises();
    const notes = [];
    [0, 1, 2, 3].forEach((i) => {
      const newNote = document.createElement('div');
      newNote.className = `abcjs-note abcjs-n${i}`;
      wrapper.vm.$el.appendChild(newNote);
      notes.push(newNote);
    });
    notes[2].classList.add('abcjs-note_selected');
    expect(notes[2].classList).toContain('abcjs-note_selected');
    wrapper.vm.resetSelected();
    expect(notes[2].classList).not.toContain('abcjs-note_selected');
  });

  // it('onNoteClick behaves as expected', async () => {
  //   const wrapper = await basicMount();
  //   await flushPromises();
  //   const note = document.createElement('div');
  //   note.className = 'abcjs-note abcjs-n2';
  //   const other = document.createElement('div');
  //   other.className = 'abcjs-thing';
  //   const event = {
  //     abselem: {
  //       elemset: [note, other],
  //     },
  //   };
  // });
});
