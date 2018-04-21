import React, { Component } from 'react';
import {  Icon, Button, Form, Row, Col, Input, InputNumber } from 'antd';
import './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
    }
    handleSearch = (e) => {
        e.preventDefault();
        let self = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const data = {};
                for(var i in values){
                    data[i] = {
                        value : values[i],
                        type : this.getType(i),
                    }
                };
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
            onChange : item.fun,
        };

        switch (item.type) {
            case "text":
                return <Input {..._attr} />;
            case "number":
                return <InputNumber {..._attr} />;
            case "textarea":
                return <TextArea {..._attr}/>;
            default:
                break;
        };
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
                className="ant-advanced-search-form "
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
export default Form.create()(SearchForm);