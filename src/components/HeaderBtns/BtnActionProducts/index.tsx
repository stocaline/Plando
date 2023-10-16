import { TouchableOpacity, Modal, Alert, ActivityIndicator, Text, View } from 'react-native';
import { styles } from './styles';
import Icon from "react-native-vector-icons/Feather"
import { useState } from 'react';
import uuid from "react-native-uuid"
import { getRealm } from '../../../database/realm';
import { getProduct } from '../../../utils/Products/ProductFunctions';
import { searchProduct } from '../../../utils/Products/WebScrapping';

type Props = {
    productId: string
}

export default function BtnActionProducts({productId}: Props) {

    const [isLoading, setIsLoading] = useState(false);

    function errorSinc() {
        Alert.alert(
            'Não foi possivel sincronizar seu produto',
            'No momento não foi possivel sincronizar, verifique sua conexão de rede e tente novamente mais tarde.',
            [
                {
                    text: 'OK',
                    onPress: () => { },
                },
            ],
            { cancelable: true }
        );
    }

    async function handleSincInfo() {
        setIsLoading(true)
        var product = await getProduct(productId)
        await searchProduct(product!._id, product!.link)
        var item = await getProduct(productId)
        if (item) {
            setIsLoading(false)
            //@ts-ignore 
            openProduct(item, navigation)
        } else {
            setIsLoading(false)
            errorSinc()
        }
    }

    return (<>
        <TouchableOpacity
            style={styles.button}
            //@ts-ignore
            onPress={() => handleSincInfo()}
        >
            <Icon
                name='refresh-cw'
                color={"#fff"}
                size={20}
            />
        </TouchableOpacity>

        {isLoading ?
            <Modal transparent>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Carregando...</Text>
                </View>
            </Modal>
            :
            <View></View>
        }
    </>
    )
}