import { useState } from "react";
import { Alert, Image, StatusBar, View } from "react-native";

//COMPONENTS
import { Input } from "@/components/input";
import { Button } from "@/components/button";

//LIBS
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Redirect } from "expo-router";

//STYLES
import { colors } from "@/styles/colors";

//API
import { api } from "@/server/api";

//STORE
import { useBadgeStore } from "@/store/badge-store";

export default function Home() {
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const badgeStore = useBadgeStore();

    async function handleAccessCredential() {
        try {
            if (!code.trim()) {
                return Alert.alert("Ingresso", "Informe o código do ingresso!");
            }

            setIsLoading(true);

            const { data } = await api.get(`/attendees/${code}/badge`);
            badgeStore.save(data.badge);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            Alert.alert("Ingresso", "Não foi possível acessar sua credencial!");
        }
    }

    if (badgeStore.data?.checkInURL) {
        return <Redirect href="/ticket" />;
    }

    return (
        <View className="flex-1 bg-green-500 items-center justify-center p-8">
            <StatusBar barStyle={"light-content"} />
            <Image
                source={require("@/assets/logo.png")}
                className="h-16"
                resizeMode="contain"
            />

            <View className="w-full mt-12 gap-3">
                <Input>
                    <MaterialCommunityIcons
                        name="ticket-confirmation-outline"
                        size={20}
                        color={colors.green[200]}
                    />
                    <Input.Field
                        placeholder="Código do ingresso"
                        onChangeText={setCode}
                    />
                </Input>

                <Button
                    title="Acessar credencial"
                    isLoading={isLoading}
                    onPress={handleAccessCredential}
                />

                <Link
                    href="/register"
                    className="text-gray-100 text-base font-bold text-center mt-8"
                >
                    Ainda não possui ingresso?
                </Link>
            </View>
        </View>
    );
}
