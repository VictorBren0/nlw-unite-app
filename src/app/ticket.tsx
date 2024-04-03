import {
    Alert,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    Modal,
} from "react-native";
import { Header } from "@/components/header";
import { Credential } from "@/components/credential";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { QRCode } from "@/components/qrcode";

export default function Ticket() {
    const [image, setImage] = useState("");
    const [expandQRCode, setExpandQRCode] = useState(false);

    async function handleSelectImage() {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
            });

            if (result.assets) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Foto", "Erro ao selecionar imagem");
        }
    }
    return (
        <View className="flex-1 bg-green-500">
            <StatusBar barStyle={"light-content"} />
            <Header title="Minha Credencial" />
            <ScrollView
                className="-mt-28 -z-10"
                contentContainerClassName="px-8 pb-8"
                showsVerticalScrollIndicator={false}
            >
                <Credential
                    image={image}
                    onChangeAvatar={handleSelectImage}
                    onExpandQRCode={() => setExpandQRCode(true)}
                />

                <FontAwesome
                    name="angle-double-down"
                    size={24}
                    color={colors.gray[300]}
                    className="self-center my-6"
                />

                <Text className="text-white font-bold text-2xl mt-4">
                    Compartilhar credencial
                </Text>

                <Text className="text-white font-regular text-base mt-1 mb-6">
                    Mostre ao mundo que você vai participar do Unite Summit!
                </Text>

                <Button title="Compartilhar" isLoading={false} />

                <TouchableOpacity activeOpacity={0.7}>
                    <View className="mt-10">
                        <Text className="text-base text-white font-bold text-center">
                            Remover Ingresso
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>

            <Modal visible={expandQRCode} statusBarTranslucent animationType="fade">
                <View className="flex-1 bg-green-500 items-center justify-center">
                    <QRCode value="teste" size={300} />
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setExpandQRCode(false)}>
                        <Text className="font-body text-orange-500 text-sm mt-10 text-center">
                            Fechar QRCode
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
