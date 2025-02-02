import { is, getBusinessObject, getDi } from 'bpmn-js/lib/util/ModelUtil';
import { Collapse, Select } from 'antd';
import { Form, Input, Button } from 'antd';
const { Panel } = Collapse;
import React, { Component } from 'react';

const { Option } = Select;

import './PropertiesView.css';
import Leave from './Leave';
import FieldTable from './FieldTable';
import { PlusCircleOutlined } from '@ant-design/icons';
import ElementProperties from './ElementProperties';
import Approver from './Approver';
import Ruler from './Ruler';

export default class PropertiesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedElements: [],
      element: null,
      flow: null,
    };
  }

  init = () => {
    const _flow = window.localStorage.getItem('flow');
    this.setState({
      flow: JSON.parse(_flow),
    });
  };
  componentDidMount() {
    const { modeler } = this.props;
    this.init();
    modeler.on('selection.changed', (e) => {
      const { element } = this.state;

      this.setState({
        selectedElements: e.newSelection,
        element: e.newSelection[0],
      });
    });

    modeler.on('element.changed', (e) => {
      const { element } = e;

      const { element: currentElement } = this.state;

      if (!currentElement) {
        return;
      }

      // update panel, if currently selected element changed
      if (element.id === currentElement.id) {
        this.setState({
          element,
        });
      }
    });
  }
  creatForm = () => {
    alert('跳转到动态表单');
  };
  render() {
    const { modeler } = this.props;

    const { selectedElements, element, flow } = this.state;
    console.log(element);
    return (
      <div className={'panel-content'}>
        <div className="element-properties">
          <h3 className={'panel-tittle'}>属性</h3>
          <Form>
            <Collapse defaultActiveKey={['1']}>
              <Panel header="常规" key="1">
                {selectedElements.length > 0 ? null : (
                  <fieldset>
                    <label>流程名称</label>
                    <span>{flow?.name}</span>
                  </fieldset>
                )}

                {selectedElements.length === 1 && (
                  <ElementProperties modeler={modeler} element={element} />
                )}

                {/*{selectedElements.length === 0 && (*/}
                {/*  <span>Please select an element.</span>*/}
                {/*)}*/}

                {selectedElements.length > 1 && (
                  <span>Please select a single element.</span>
                )}
              </Panel>
              {element?.type === 'bpmn:StartEvent' && (
                <Panel header={'申请人'} key="2">
                  <Form.Item label="申请人" name="applyPerson">
                    <Select style={{ width: 120 }}>
                      <Option value="anyone">任何人可填</Option>
                      <Option value="role">指定角色可填</Option>
                      <Option value="person">指定人可填</Option>
                    </Select>
                  </Form.Item>
                </Panel>
              )}
              {element?.type === 'bpmn:UserTask' && (
                <Panel header={'审批人'} key="3">
                  <Approver></Approver>
                </Panel>
              )}
              <Panel header="规则" key="4">
                <Ruler></Ruler>
              </Panel>
              <Panel header="表单" key="5">
                <Form.Item label="目标表单">
                  <Form.Item name="targetForm" noStyle>
                    <Select style={{ width: 120 }}>
                      <Option value="form1">表单一</Option>
                      <Option value="form2">表单二</Option>
                    </Select>
                  </Form.Item>
                  <Button
                    type={'primary'}
                    icon={<PlusCircleOutlined />}
                    onClick={this.creatForm}
                  >
                    创建
                  </Button>
                </Form.Item>
                <div>
                  <label>字段权限</label>
                  <FieldTable></FieldTable>
                </div>
              </Panel>
            </Collapse>
          </Form>
        </div>
      </div>
    );
  }
}

// helpers ///////////////////

function hasDefinition(event, definitionType) {
  const definitions = event.businessObject.eventDefinitions || [];

  return definitions.some((d) => is(d, definitionType));
}
