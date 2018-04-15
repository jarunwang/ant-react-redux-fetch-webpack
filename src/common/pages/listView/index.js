import React from 'react'
import { Table, Form, Button, Mention, Row, Col,Input, DatePicker  } from 'antd';
import './index.less'

const { toContentState, getMentions } = Mention;
const FormItem = Form.Item;



const columns = [{
    title: 'Name',
    dataIndex: 'name',
    width: 150,
}, {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
}, {
    title: 'Address',
    dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

class index extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    };
    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }
    render() {
        const { loading, selectedRowKeys } = this.state;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        };

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div>
                    <Form layout="horizontal">
                        <Row gutter={16}>
                            <Col className="gutter-row" span={6}>
                                <FormItem label="文本框"  {...formItemLayout}>  
                                    <Input type="text" placeholder="text" />
                                </FormItem>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <FormItem label="时间"  {...formItemLayout} >   
                                    <DatePicker  format="YYYY/MM/DD HH:mm:ss" showTime/>
                                </FormItem>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <FormItem label="选择框"  {...formItemLayout} >   
                                <Select labelInValue defaultValue={{ key: 'lucy' }}>
                                    <Option value="jack">Jack (100)</Option>
                                    <Option value="lucy">Lucy (101)</Option>
                                </Select>
                                </FormItem>
                            </Col>
                            <Col className="gutter-row" span={6}>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Button
                        type="primary"
                        onClick={this.start}
                        disabled={!hasSelected}
                        loading={loading}
                    >
                        Reload
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ y: 240 }} />
            </div>
        );
    }
}

const listView = Form.create()(index);

export default listView