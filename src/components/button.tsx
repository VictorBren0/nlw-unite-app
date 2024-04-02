import { ActivityIndicator, Text, TouchableOpacity, View, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps &{
    title: string;
    isLoading?: boolean;
};

export function Button({ title, isLoading = false, ...rest }: Props) {
    return (
        <TouchableOpacity 
        disabled={isLoading}
        activeOpacity={0.7}
        {...rest}
        >
            <View className="w-full h-14 bg-orange-500 items-center justify-center rounded-lg">
                {isLoading ? (
                    <ActivityIndicator className="text-green-500" />
                ) : (
                    <Text className="text-green-500 text-base font-bold uppercase">
                        {title}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
}
