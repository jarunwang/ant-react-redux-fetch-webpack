import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Divider, Button, Modal, Form, Row, Col, Input, InputNumber } from 'antd';
import { addTest, editTest, delTest, serachTest } from 'actions/test';
import './index.less';
import { checkKey , filterList} from '../../utils/util';

const { Column, ColumnGroup } = Table;
const FormItem = Form.Item;
const confirm = Modal.confirm;
const { TextArea } = Input;

const searchConfig = [
    {
        type : "text",
        name : "name",
        searchFilterType : "string",
        defaultValue : "0000",
        placeholder : "name",
        /* rules: [{ required: true, message: 'Please input your name!' }], */
    },
    {
        type : "textarea",
        name : "address",
        searchFilterType : "string",
        extendAttr : () =>{{rows=1}}
    },
    {
        type : "number",
        name : "age",
        searchFilterType : "number",
        defaultValue : "2",
        extendAttr : () => {{min=1,max=10}},
        fun : () => {console.log("number")},
    }
]

const mapStateToProps = (state,action) => {
    return {
        testList : filterList(state.testList,state.searchText),
        searchText : state.searchText
    }
    
};

class SearchForm extends React.Component {
    constructor(props) {
        super(props)
    }
    handleSearch = (e) => {
        e.preventDefault();
        let self = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                const data = {};
                //this.props.config
                for(var i in values){
                    data[i] = {
                        name : values[i],
                        type : this.getType(i),
                    }
                }
                self.props.onSubmit(data);
            }
        });
    }
    getType = (item) => {
        for(let n = 0;n<this.props.config.length;n++){
            if(this.props.config[n].name == item){
                return this.props.config[n].searchFilterType;
            }
        }
    }
    handleReset = () => {
        this.props.form.resetFields();
    }
    getChildren() {
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < this.props.config.length; i++) {
            children.push(
                <Col span={8} key={i}>
                    <FormItem label={this.props.config[i].name}>
                        {getFieldDecorator(this.props.config[i].name, {
                            rules: this.props.config[i].rules?this.props.config[i].rules:"",
                        })(
                            this.getInputType(this.props.config[i])
                        )}
                    </FormItem>
                </Col>
            );
        }
        return children;
    }
    getInputType(item){
        let _attr = {
            ...item.extendAttr,
            type : item.searchFilterType,
            placeholder : item.placeholder,
            onChange : item.fun
        }

        switch (item.type) {
            case "text":
                return <Input {..._attr} />;
            case "number":
                return <InputNumber {..._attr} />;
            case "textarea":
                return <TextArea {..._attr}/>
            default:
                break;
        }
    }
    componentDidMount () {
        let setData = {};
        this.props.config.map(i=>{
            setData[i.name] = i.defaultValue;
        });
        this.props.form.setFieldsValue(setData);
    }
    render() {
        return (
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
            >
                <Row gutter={24}>{this.getChildren()}</Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">Search</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>Clear</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
const Search = Form.create()(SearchForm);


@connect(mapStateToProps)
class TestForm extends React.Component {
    constructor(props) {
        super(props);
        this.dialogValue = {
            name: "",
            age: "",
            address: "",
            id: "",
            key: ""
        }

        this.state = {
            visible: false,
            ...this.dialogValue
        }
    }
    handleAdd = () => {
        this.setState({ visible: true });
        this.dialogSetValue();
    }
    handleDel = (e) => {
        e.preventDefault();
        let self = this,
            $target = e.target;

        confirm({
            title: '你确定要删除这条数据?',
            content: '删除操作',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                self.props.dispatch(delTest({
                    id: $target.id,
                    type: "DEL_TEST"
                }))
            },
            onCancel() {
            },
        });
    }
    handleEdit = (e) => {
        e.preventDefault();
        this.setState({ visible: true });
        this.dialogSetValue(this.props.testList.filter(t => t.id == e.target.id))
    }
    dialogOk = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let id = values.id,
                    data = {
                        name: values.name,
                        age: values.age,
                        address: values.address
                    }
                if (id) {
                    data.id = id;
                    data.type = "EDIT_TEST";

                    this.props.dispatch(editTest(data));
                } else {
                    const last = this.props.testList[this.props.testList.length - 1];
                    data.id = last ? parseInt(last.id, 10) + 1 : 0;
                    data.type = "ADD_TEST";

                    this.props.dispatch(addTest(data));
                }
                this.setState({ visible: false });
            }
        });
    }
    dialogSetValue = (obj) => {
        let data = obj ? obj[0] : this.dialogValue;
        this.props.form.setFieldsValue(data);
    }
    dialogCancel = () => {
        this.setState({ visible: false });
    }
    onSearch = (searchFields) => {
        searchFields.type = "SEARCH_TEST";
        this.props.dispatch(serachTest(searchFields));
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const colStyle = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 }
        }
        return (
            <div>
                <Search onSubmit={this.onSearch} config={searchConfig}/>
                <Modal title="Basic Modal" visible={this.state.visible} onOk={this.dialogOk} onCancel={this.dialogCancel}>
                    <Form layout="horizontal">
                        <FormItem label="name" {...colStyle}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your name!' }],
                            })(
                                <Input placeholder="name" />
                            )}
                        </FormItem>
                        <FormItem label="age" {...colStyle}>
                            {getFieldDecorator('age', {
                                rules: [{ required: true, message: 'Please input your age!' }],
                            })(
                                <InputNumber min={1} max={100} placeholder="1" />
                            )}
                        </FormItem>
                        <FormItem label="address" {...colStyle}>
                            {getFieldDecorator('address', {
                                rules: [{ required: true, message: 'Please input your address!' }],
                            })(
                                <TextArea placeholder="address" autosize />
                            )}
                        </FormItem>
                        {getFieldDecorator('id')
                            (
                            <Input type="hidden" />
                            )}
                        {getFieldDecorator('key')
                            (
                            <Input type="hidden" />
                            )}
                    </Form>
                </Modal>
                <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
                <Table dataSource={checkKey(this.props.testList)}>
                    <Column
                        title="name"
                        dataIndex="name"
                        key="name"
                    />
                    <Column
                        title="Age"
                        dataIndex="age"
                        key="age"
                    />
                    <Column
                        title="Address"
                        dataIndex="address"
                        key="address"
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <span>
                                <a href="javascript:;" onClick={this.handleDel} id={record.id}>Delete</a>
                                <Divider type="vertical" />
                                <a href="javascript:;" onClick={this.handleEdit} id={record.id}>Edit</a>
                            </span>
                        )}
                    />
                </Table>
            </div>
        )
    }
}

const Test = Form.create()(TestForm);

export default Test;
