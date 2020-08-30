import React, { Component } from 'react';
import { Container, Tabs, ScrollableTab, Tab } from 'native-base';
import RestoranKota from './RestorantKota';
import Footers from '../Footers';
export default class Kota extends Component {
    static navigationOptions = {
        header:null
    }
    render() {
        return (
            <Container>
                <Tabs renderTabBar={() => <ScrollableTab />}>
                    <Tab heading="Jakarta">
                        <RestoranKota name="Jakarta" id_kota="74" />
                    </Tab>
                    <Tab heading="Bandung">
                        <RestoranKota name="Bandung" id_kota="11052"/>
                    </Tab>
                    <Tab heading="Bali">
                        <RestoranKota name="Bali" id_kota="170" />
                    </Tab>
                </Tabs>
                <Footers />
            </Container>
        )
    }
}