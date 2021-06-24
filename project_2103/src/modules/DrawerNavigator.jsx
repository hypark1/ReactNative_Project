import React, {useCallback, useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PlayScreen from '~/screens/Play/PlayScreen';
import VideoScreen from '~/screens/Play/VideoScreen';
import PlayVideoIOS from '~/screens/Play/PlayVideoIOS';
import LearnerScreen from '~/screens/Learner/LearnerScreen';
import SettingScreen from '~/screens/Setting/SettingScreen';

const Drawer = createDrawerNavigator();

/*네이게이션 생성*/
const DrawerNavigator = () => {
    return (
        <>
            <Drawer.Navigator initialRouteName="PlayList"
                /*drawerContent={props => DrawerScreen(props)}*/>
                <Drawer.Screen name="PlayList" component={PlayScreen}/>
                <Drawer.Screen name="Learner" component={LearnerScreen}/>
                <Drawer.Screen name="PlayVideo" component={VideoScreen}/>
                <Drawer.Screen name="Setting" component={SettingScreen}/>
                <Drawer.Screen name="PlayVideoIOS" component={PlayVideoIOS}/>
            </Drawer.Navigator>
        </>
    );
};

export default DrawerNavigator;
