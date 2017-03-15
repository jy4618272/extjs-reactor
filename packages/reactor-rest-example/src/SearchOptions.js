import React, { Component, PropTypes } from 'react';
import { Panel, FieldSet, TextField, SelectField, SliderField, Container, Spacer } from '@extjs/reactor/modern';
import { connect } from 'react-redux';
import { updateCriteria } from './actions';

class SearchOptions extends Component {

    static propTypes = {
        docked: PropTypes.string,
        criteria: PropTypes.object,
        hidden: PropTypes.bool
    }

    onFieldChange = Ext.Function.createBuffered(() => {
        const criteria = {};
        const { dispatch } = this.props;
        
        for (let name in this.refs) {
            criteria[name] = this.refs[name].getValue()
        }

        dispatch(updateCriteria(criteria));
    }, 250)

    render() {
        const { criteria } = this.props;

        return (
            <Panel bodyPadding={15} docked="left" width="250" layout="fit" scrollable docked={this.props.docked} hidden={this.props.hidden} border={1}>
                <FieldSet title="Search Options">
                    <TextField 
                        ref="firstName"
                        style={styles.field}
                        label="First Name"
                        onChange={this.onFieldChange}
                    />
                    <TextField
                        ref="lastName"
                        style={styles.field}
                        label="Last Name"
                        onChange={this.onFieldChange}
                    />
                    <SliderField 
                        ref="age"
                        style={styles.field}
                        minValue={0} 
                        maxValue={100} 
                        values={[0, 100]} 
                        label="Age"
                        onChange={this.onFieldChange}
                    />
                    <Container layout="center" style={{paddingLeft: '5px', color: '#999'}}>
                        <div>{(criteria.age || [0, 100]).join(' - ')}</div>
                    </Container>
                    <SelectField
                        ref="gender"
                        style={styles.field}
                        label="Gender"
                        options={[
                            { text: '' },
                            { text: 'Male', value: 'Male' },
                            { text: 'Female', value: 'Female' }
                        ]}
                        onChange={this.onFieldChange}
                    />
                </FieldSet>
            </Panel>        
        )
    }

}

const styles = {
    field: {
        marginTop: '15px'
    }
};

const mapStateToProps = (state) => {
    return { ...state }
};

export default connect(mapStateToProps)(SearchOptions);