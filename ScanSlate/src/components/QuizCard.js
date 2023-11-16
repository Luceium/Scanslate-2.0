import React, { useState } from 'react';
import { View, Image, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors } from '../../base';
const QuizCard = ({ imageUrl, onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    /* Handle submission logic CODE GOES HERE*/
    onSubmit(answer);
    setAnswer(''); // Clear the input after submission
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <TextInput
        style={styles.input}
        onChangeText={setAnswer}
        value={answer}
        numberOfLines={1}
        autoCapitalize='none'
        clearButtonMode='always'
        maxLength={50}
      />
     <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
     </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '80%' , // Take up the whole width of the screen minus some margin
    borderRadius: 20,
    backgroundColor: colors.flashCard, // Adjust the background color as needed
    alignItems: 'center',
    padding: 20,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
    borderColor: '#000',
    borderWidth:1,
    height: '85%'
  },
  image: {
    width: '100%',
    height: '70%', // Adjust the height as needed
    borderRadius:20
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'black',
    width: '50%',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  submitBtn: {
    width:'95%',
    height:'10%',
    backgroundColor:colors.bottom_tab,
    justifyContent:'center',
    alignItems:'center',
    bottom:0,
    position:'absolute',
    borderRadius: 20,
    borderColor:'black',
    borderWidth:1,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
  },
  submitText: {
    fontSize: 25,
    fontWeight:'500',
    letterSpacing: 5
  }
});

export default QuizCard;