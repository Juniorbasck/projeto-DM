import { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Dimensions,
    Image,
    Alert
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { CustomTextInput } from '../components/CustomTextInput';
import { CustomButton } from '../components/CustomButton';
import { CustomDatePicker } from '../components/CustomDatePicker';
import { CustomDropdown } from '../components/CustomDropdown';
import { CustomImagePicker } from '../components/CustomImagePicker';
import { CustomCheckbox } from '../components/CustomCheckbox';
import { getPaymentMethods } from '../service';
import { Snackbar } from 'react-native-paper';
import { updateExpense } from '../service';

function validate(name, surname, username) {
    return title.length > 0 && entity.length > 0 && price?.toString().length > 0;
}

function update(item, title, entity, date, price, paymentMethod, image, paid) {
    item.title = title;
    item.entity = entity;
    item.date = date;
    item.price = price;
    item.paymentMethod = paymentMethod;
    item.image = image;
    item.paid = paid;
    updateExpense(item);
}

function dataChanged(item, title, entity, date, price, paymentMethod, image, paid) {
    return item.title != title || item.entity != entity || item.date != date || item.price != price || item.paymentMethod != paymentMethod || item.paid != paid;
}

const ProfileDetailsScreen = ({route, navigation}) => {
    const { user } = route.params;
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [image, setImage] = useState(null);
    const [snackBarVisible, setSnackBarVisible] = useState(false);

    return (
        <View style={styles.outerContainer}>
            <ScrollView 
                contentContainerStyle={
                    [
                        styles.scrollView, 
                        image ? {
                            height: 1.3 * Dimensions.get('window').height
                        } : {
                            height: Dimensions.get('window').height
                        }
                    ]
                }
                keyboardDismissMode='on-drag'
            >   
                <CustomTextInput
                    state={name}
                    setState={setName}
                    placeholder='Nome'
                    widthPercentage={90}
                    marginTopPercentage={5}
                    autofocus={true}
                />
                <CustomTextInput
                    state={surname}
                    setState={setSurname}
                    placeholder='Apelido'
                    widthPercentage={90}
                />
                <CustomTextInput
                    state={username}
                    setState={setUsername}
                    placeholder='Preço'
                    widthPercentage={90}
                    marginBottomPercentage={4}
                />
                <CustomButton
                    text={'Guardar'}
                    onPress={() => {
                            setSnackBarVisible(true);
                            setTimeout(() => navigation.goBack(), 500);
                        }
                    }
                    backgroundColor={Colors.primaryKeyColor}
                    textColor={Colors.onPrimaryKeyColor}
                    widthPercentage={84}
                />
            </ScrollView>
            <Snackbar
                visible={snackBarVisible}
                onDismiss={() => setSnackBarVisible(false)}
                duration={500}
            >
                Dados guardados com sucesso!
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: Colors.primaryKeyColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
        marginTop: '5%',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        backgroundColor: Colors.secondaryKeyColor
    },
    rowContainer: {
        flexDirection: 'row'
    },
    paymentMethod: {
        textAlign: 'center',
    },
    image: {
        alignSelf: 'center',
        width: .9 * Dimensions.get('window').width,
        height: .3 * Dimensions.get('window').height,
        marginBottom: '8%'
    }
});

export { ProfileDetailsScreen };
