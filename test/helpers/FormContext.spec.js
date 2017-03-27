import { List } from 'immutable';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { ControlRecord } from '../../src/helpers/ControlRecordTreeBuilder';
import FormContext from "../../src/helpers/FormContext";

chai.use(chaiEnzyme());

describe('FormContext', () => {

  const booleanConceptName = "Smoking History";
  const formFieldPathInPosition0 = "3129_Complex.1/1-0";
  const formFieldPathInPosition1 = "3129_Complex.1/2-0";

  const booleanConcept = {
    "answers": [],
    "datatype": "Boolean",
    "name": booleanConceptName,
    "properties": {
      "allowDecimal": null
    },
    "uuid": "c2a43174-c9db-4e54-8516-17372c83537f"
  };
  const textBoxConcept = {
    "answers": [],
    "datatype": "Text",
    "description": [],
    "name": "Disposition Note",
    "properties": {
      "allowDecimal": null
    },
    "uuid": "81d4a9dc-3f10-11e4-adec-0800271c1b75"
  };

  const booleanObsTree = new ControlRecord({
    control: {
      "concept": booleanConcept,
      "hiAbsolute": null,
      "hiNormal": null,
      "id": "1",
      "label": {
        "type": "label",
        "value": booleanConceptName
      },
      "lowAbsolute": null,
      "lowNormal": null,
      "options": [
        {
          "name": "Yes",
          "value": true
        },
        {
          "name": "No",
          "value": false
        }
      ],
      "properties": {
        "addMore": false,
        "hideLabel": false,
        "location": {
          "column": 0,
          "row": 0
        },
        "mandatory": false,
        "notes": false
      },
      "type": "obsControl",
      "units": null
    },
    formFieldPath: formFieldPathInPosition0,
    dataSource: {
      "concept": booleanConcept,
      "formFieldPath": formFieldPathInPosition0,
      "formNamespace": "Bahmni",
      "inactive": false,
      "voided": true
    },
  });
  const booleanObsTree2 = new ControlRecord({
    control: {
      "concept": booleanConcept,
      "hiAbsolute": null,
      "hiNormal": null,
      "id": "2",
      "label": {
        "type": "label",
        "value": booleanConceptName
      },
      "lowAbsolute": null,
      "lowNormal": null,
      "options": [
        {
          "name": "Yes",
          "value": true
        },
        {
          "name": "No",
          "value": false
        }
      ],
      "properties": {
        "addMore": false,
        "hideLabel": false,
        "location": {
          "column": 0,
          "row": 0
        },
        "mandatory": false,
        "notes": false
      },
      "type": "obsControl",
      "units": null
    },
    formFieldPath: formFieldPathInPosition1,
    dataSource: {
      "concept": booleanConcept,
      "formFieldPath": formFieldPathInPosition1,
      "formNamespace": "Bahmni",
      "inactive": false,
      "voided": true
    },
  });
  const textBoxObsTree = new ControlRecord({
    control: {
      "concept": textBoxConcept,
      "hiAbsolute": null,
      "hiNormal": null,
      "id": "3",
      "label": {
        "type": "label",
        "value": "Disposition Note"
      },
      "lowAbsolute": null,
      "lowNormal": null,
      "properties": {
        "addMore": false,
        "hideLabel": false,
        "location": {
          "column": 0,
          "row": 2
        },
        "mandatory": false,
        "notes": false
      },
      "type": "obsControl",
      "units": null
    },
    formFieldPath: '3129_Complex.1/3-0',
    dataSource: {
      "concept": textBoxConcept,
      "formFieldPath": "3129_Complex.1/3-0",
      "formNamespace": "Bahmni",
      "inactive": false,
      "voided": true
    },
  });

  const recordTree = new ControlRecord({ children: List.of(booleanObsTree, booleanObsTree2, textBoxObsTree) });

  it('should get first suitable record when given concept name without position', () => {
    const formContext = new FormContext(recordTree);

    const targetRecord = formContext.get(booleanConceptName);

    expect(targetRecord.formFieldPath).to.equal(formFieldPathInPosition0);
  });

  it('should get assign suitable record when given concept name with position', () => {
    const formContext = new FormContext(recordTree);

    const targetRecord = formContext.get(booleanConceptName, 1);

    expect(targetRecord.formFieldPath).to.equal(formFieldPathInPosition1);
  });

  it('should set record disabled when given set api triggered', () => {
    const formContext = new FormContext(recordTree);

    const originalRootTree = formContext.getData();
    const originalRecord = originalRootTree.children.get(0);
    expect(originalRecord.formFieldPath).to.equal(formFieldPathInPosition0);
    expect(originalRecord.enabled).to.equal(true);

    formContext.set(booleanConceptName, 0, 'enabled', false);

    const updatedRootTree = formContext.getData();
    const targetRecord = updatedRootTree.children.get(0);
    expect(targetRecord.formFieldPath).to.equal(formFieldPathInPosition0);
    expect(targetRecord.enabled).to.equal(false);
  });
});