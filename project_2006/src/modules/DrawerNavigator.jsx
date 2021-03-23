import React, {useCallback, useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerScreen from '~/screens/Drawer/DrawerScreen'
import ChunkScreen from '~/screens/Chunk/ChunkScreen';
import ReportScreen from '~/screens/Report/ReportScreen';
import CouponScreen from '~/screens/Coupon/CouponScreen';
import AnnounceScreen from '~/screens/Announce/AnnounceScreen';
import ReviewScreen from '~/screens/Review/ReviewScreen';
import MissionScreen from "~/screens/Mission/MissionScreen";
import LoadScreen from '~/screens/LoadScreen';
import PopupScreen from "~/screens/PopupScreen";
import ModalDino from "~/screens/Modal/Dino/ModalDino";

const Drawer = createDrawerNavigator();

/*네이게이션 생성*/
const DrawerNavigator = () => {
    const [dinoVisible, setDinoVisible] = useState(false);

    const CloseDino = useCallback(() => {
        setDinoVisible(false);
    }, []);

    return (
        <>
            <LoadScreen />
            <PopupScreen />
            {/*<ModalDino visible={dinoVisible}
                       onPress={CloseDino}/>*/}
            <Drawer.Navigator initialRouteName="Chunk"
                              drawerContent={props => DrawerScreen(props)}>
                <Drawer.Screen name="Chunk" component={ChunkScreen}/>
                <Drawer.Screen name="Report" component={ReportScreen} />
                <Drawer.Screen name="Challange" component={MissionScreen} />
                <Drawer.Screen name="Coupon" component={CouponScreen} />
                <Drawer.Screen name="Announce" component={AnnounceScreen} />
                <Drawer.Screen name="Review" component={ReviewScreen} />
            </Drawer.Navigator>
        </>
    );
};

export default DrawerNavigator;
