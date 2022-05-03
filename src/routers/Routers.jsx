import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Home from "../views/Home"
import Detail from "../views/Detail"

const screens = {
  Home:{
    screen: Home
  },
  Detail:{
    screen: Detail
  },
}

const Routers = createStackNavigator(screens)


export default createAppContainer(Routers)
