import React, { Component, PropTypes } from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { Section } from 'components/Section.jsx';
import sinon from 'sinon';
import { Obs } from 'src/helpers/Obs';
import { ObsList } from 'src/helpers/ObsList';
import { SectionMapper } from 'src/mapper/SectionMapper';
import ComponentStore from 'src/helpers/componentStore';
import { List } from 'immutable';

chai.use(chaiEnzyme());

function getLocationProperties(row, column) {
  return { location: { row, column } };
}

class DummyControl extends Component {
  getValue() {
    return { uuid: this.props.formUuid };
  }

  render() {
    return (<div>{ this.props.formUuid }</div>);
  }
}

DummyControl.propTypes = {
  formUuid: PropTypes.string,
};

describe('Section', () => {
  before(() => {
    ComponentStore.registerComponent('randomType', DummyControl);
  });

  after(() => {
    ComponentStore.deRegisterComponent('randomType');
  });

  const formName = 'formName';
  const formVersion = '1';

  const metadata = {
    id: '1',
    type: 'section',
    properties: getLocationProperties(0, 0),
    label: {
      type: 'label',
      value: 'section label',
    },
    controls: [
      {
        id: '100',
        type: 'randomType',
        properties: getLocationProperties(0, 1),
      },
      {
        id: '101',
        type: 'randomType',
        properties: getLocationProperties(0, 2),
      },
      {
        id: '102',
        type: 'randomType',
        properties: getLocationProperties(1, 0),
      },
    ],
  };
  const onChangeSpy = sinon.spy();
  const observation = new ObsList();
  const sectionMapper = new SectionMapper();

  describe('render', () => {
    it('should render section control', () => {
      const wrapper = mount(
        <Section
          formName={formName}
          formVersion={formVersion}
          mapper={sectionMapper}
          metadata={metadata}
          obs={observation}
          onValueChanged={onChangeSpy}
          validate={false}
        />);


      expect(wrapper.find('legend').text()).to.eql(metadata.label.value);
      expect(wrapper).to.have.exactly(3).descendants('DummyControl');
    });

    it('should render section control with observations', () => {
      const observations = (new ObsList()).setObsList((new List()).push(
        new Obs({ formFieldPath: 'formName.1/100-0', value: '72' })
      ));

      const wrapper = mount(
          <Section
            formName={formName}
            formVersion={formVersion}
            mapper={sectionMapper}
            metadata={metadata}
            obs={observations}
            onValueChanged={onChangeSpy}
            validate={false}
          />);

      expect(wrapper.find('legend').text()).to.eql(metadata.label.value);
      expect(wrapper).to.have.exactly(3).descendants('DummyControl');
      expect(wrapper.find('DummyControl').at(0).props().obs.value).to.eql('72');
      expect(wrapper.find('DummyControl').at(1).props().obs.value).to.eql(undefined);
      expect(wrapper.find('DummyControl').at(2).props().obs.value).to.eql(undefined);
    });

    it('should render section control with only the registered controls', () => {
      ComponentStore.deRegisterComponent('randomType');
      const wrapper = mount(
          <Section
            formName={formName}
            formVersion={formVersion}
            mapper={sectionMapper}
            metadata={metadata}
            obs={observation}
            onValueChanged={onChangeSpy}
            validate={false}
          />);

      expect(wrapper).to.not.have.descendants('DummyControl');
      ComponentStore.registerComponent('randomType', DummyControl);
    });


    it('should trigger onChange in section if its child obs has changed', () => {
      const pulseNumericConcept = {
        name: 'Pulse',
        uuid: 'pulseUuid',
        datatype: 'Numeric',
        conceptClass: 'Misc',
      };

      const metadataUpdated = {
        id: '1',
        type: 'section',

        properties: getLocationProperties(0, 0),
        label: {
          type: 'label',
          value: 'label',
        },
        controls: [
          {
            id: '100',
            type: 'randomType',
            concept: pulseNumericConcept,
            properties: getLocationProperties(0, 1),
          },
        ],
      };

      const pulseNumericObs = new Obs({
        concept: pulseNumericConcept,
        value: 10, formFieldPath: 'formName.1/100-0', uuid: 'childObs1Uuid',
      });

      const obsList = (new ObsList).setObsList(new List().push(pulseNumericObs));

      const wrapper = mount(
        <Section
          formName={formName}
          formVersion={formVersion}
          mapper={sectionMapper}
          metadata={metadataUpdated}
          obs={obsList}
          onValueChanged={onChangeSpy}
          validate={false}
        />);
      const pulseNumericUpdated = pulseNumericObs.setValue(20);
      const instance = wrapper.instance();
      instance.onChange(pulseNumericUpdated, []);
      const updatedObs = wrapper.props()
        .mapper.setValue(instance.state.obs, pulseNumericUpdated);
      sinon.assert.calledOnce(
        onChangeSpy.withArgs(updatedObs, []));
    });
  });
});