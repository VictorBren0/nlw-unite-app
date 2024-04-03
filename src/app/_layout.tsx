import "../styles/global.css";

import { Slot } from "expo-router";
import { Loading } from "@/components/loading";

import {
    useFonts,
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_500Medium,
} from "@expo-google-fonts/roboto";

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        Roboto_500Medium,
    });

    if (!fontsLoaded) {
        return <Loading />;
    }

    return <Slot />;
}
