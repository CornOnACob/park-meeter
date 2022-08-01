import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button
} from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";

const API_URL = "http://192.168.50.48:3000";

const StripePayment = props => {

  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const {confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify(props.route.params.amount),
    });
    console.log(response, 'RESPONSE');
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    if (!cardDetails?.complete || !email) {
      Alert.alert("Enter card details and email");
      return;
    }
    const billingDetails = {
      email:email
    }
    try {
      const {clientSecret, error} = await fetchPaymentIntentClientSecret();
      if (error) {
        console.log("Can't pay");
      }
      else {
        const { paymentIntent, error } = await confirmPayment
        (clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment confirm error ${error.message}`);
        }
        else if (paymentIntent) {
          alert("Payment successful");
          console.log("Payment success! ", paymentIntent);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <Button
      onPress={handlePayPress}
      title="Pay"
      disabled={loading}
      />
    </View>
  );
};

export default StripePayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
