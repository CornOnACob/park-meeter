import React, { useState } from "react";
import { CardField } from '@stripe/stripe-react-native';
import { View, Text, Button, Alert } from "react-native";
import { styles } from "./styles.js";
import { SERVER_URL } from "@env";

function PaymentScreen (props) {

  const [isTyping, setIsTyping] = useState(true);

  const total = (props.route.params.amount/100).toFixed(2);
  const totalCents = Math.ceil(props.route.params.amount);

  const fulfillPayment = async () => {
    fetch(`${SERVER_URL}/checkout:${totalCents}`, {
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
        onCardChange={cardDetails => cardDetails.complete ? setIsTyping(false) : setIsTyping(true)}
      />
      <Button
        title="Pay"
        onPress={fulfillPayment}
        disabled={isTyping}
      />
    </View>
  )
}

export default PaymentScreen;
