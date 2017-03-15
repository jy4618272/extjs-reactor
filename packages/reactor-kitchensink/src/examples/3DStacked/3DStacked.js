import React, { Component } from 'react';
import { Panel, Cartesian } from '@extjs/reactor/modern';
import ChartToolbar from '../Charts/ChartToolbar';

export default class Stacked extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['country', 'agr', 'ind', 'ser'],
        data: [
            { country: 'USA',     agr: 188217, ind: 2995787, ser: 12500746},
            { country: 'China',   agr: 918138, ind: 3611671, ser: 3792665},
            { country: 'Japan',   agr: 71568,  ind: 1640091, ser: 4258274},
            { country: 'UK',      agr: 17084,  ind: 512506,  ser: 1910915},
            { country: 'Russia',  agr: 78856,  ind: 727906,  ser: 1215198}
        ]
    })

    state = {
        theme: 'default'
    }

    changeTheme = (select, choice) => {
        this.setState({ theme: choice.get('value') });
    }

    onStackedToggle = segmentedButton => {
        this.refs.chart.getSeries()[0].setStacked(segmentedButton.getValue() === 0);
        this.refs.chart.redraw();
    }

    onTooltipRender = (tooltip, record, item) => {
        const formatString = '0,000 (millions of USD)',
            fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            sector = item.series.getTitle()[fieldIndex],
            value = Ext.util.Format.number(record.get(item.field), formatString);

        tooltip.setHtml(sector + ': ' + value);
    }

    render() {
        const { theme } = this.state;

        return (
            <Panel shadow layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    onStackGroup={this.onStackedToggle}
                    theme={theme}
                />
                <Cartesian
                    ref="chart"
                    store={this.store}
                    theme={theme}
                    interactions="itemhighlight"
                    insetPadding="40 20 10 10"
                    legend={{ type: 'sprite' }}
                    axes={[{
                        type: 'numeric3d',
                        position: 'left',
                        title: 'Billions of USD',
                        renderer: (axis, label, layoutContext) => Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000'),
                        grid: {
                            odd: {
                                fillStyle: 'rgba(255, 255, 255, 0.06)'
                            },
                            even: {
                                fillStyle: 'rgba(0, 0, 0, 0.03)'
                            }
                        }
                    }, {
                        type: 'category3d',
                        position: 'bottom',
                        grid: true
                    }]}
                    series={[{
                        type: 'bar3d',
                        xField: 'country',
                        yField: ['agr', 'ind', 'ser'],
                        title: ['Agriculture', 'Industry', 'Services'],
                        highlight: true,
                        tooltip: {
                            trackMouse: true,
                            renderer: this.onTooltipRender
                        }
                    }]}
                    sprites={[{
                        type: 'text',
                        id: 'title',
                        text: '2011 Major economies by GDP sector',
                        fontSize: 18,
                        textAlign: 'center',
                        y: 25
                    }]}
                />
            </Panel>
        )
    }
}