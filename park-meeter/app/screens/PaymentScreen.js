import React from "react";
import { CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert
} from "react-native";

function PaymentScreen (props) {

  const total = (props.route.params.amount/100).toFixed(2);
  const totalCents = Math.ceil(props.route.params.amount);

  const { confirmPayment } = useStripe();

  const fulfillPayment = async () => {
    fetch(`http://192.168.50.48:3000/checkout:${totalCents}`, {
      method: "POST",
    })
    .then(Alert.alert("Payment Successful", `Your $${total} payment was received!`, [{ text: "OK", onPress: () => props.navigation.navigate('Success') }]));
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.amount} >Total: ${total} CAD</Text>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
      />
      <Button
        title="Pay"
        onPress={fulfillPayment}
      />
    </View>
  )
}

export default PaymentScreen;

const styles = StyleSheet.create({
  amount: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 90,
    paddingBottom: 50,
  },
})
