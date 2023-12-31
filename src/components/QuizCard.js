/*
  This file creates the UI for quiz card that will be displayed in Quiz page
*/
import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import checkmark from '../../images/checkmarkIcon.png'
import x from '../../images/xIcon.png'
import { colors } from '../../base';
import { auth, update, ref, db } from '../../backend/firebase';
//main file
const QuizCard = ({id, imageUrl, onSubmit, totalQuizCount, totalScore, isCorrect, setIsCorrect }) => {
  //a variable that stores user's answer for the quiz 
  const [userAnswer, setUserAnswer] = useState('');
  // a function that will be called after user hit the submit button on the quiz 
  const handleSubmit = () => {
    /* Handle submission logic CODE GOES HERE*/
    //trim all the spaces around the user's answer and convert every characters to lowercase to make sure that the user's answer is in the same case as the actual answer when comparing 
    const {score, isCorrect} = onSubmit(userAnswer.trim().toLowerCase())
    //set the state of the answer
    setIsCorrect(isCorrect)
    //reset the user's text input form 
    setUserAnswer('')
    //update the flashcard's score in the backend
    updateFlashCardScore(score)
  };
  // a function that updates the flashcard's score in the backend
  const updateFlashCardScore = async (score) => {
    try {
      //get the current user object
      const user = auth.currentUser
      //use the id from current user object, as well as passed flashcard id to create a ref to the location of updated flashcard in the database
      const flashcardRef = ref(db, 'users/' + user.uid + '/flashcards/' + id)
      const updatedValue = {
        totalQuizCount: totalQuizCount + 1,
        totalScore: totalScore + score,
        correctPercentage: (((totalScore + score) / (totalQuizCount + 1)) * 100).toFixed(2) + '%'
      }
      //call update() function provided by firebase/database to update flashcard
      update(flashcardRef, updatedValue)

    } catch (error) { 
      //log error in the console if something goes wrong 
      console.log(error)
      alert('Update flashcard score failed')
    }

  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <TextInput
        style={styles.input}
        onChangeText={setUserAnswer}
        value={userAnswer}
        numberOfLines={1}
        autoCapitalize='none'
        clearButtonMode='always'
        maxLength={50}
      />
      {isCorrect === '' ?
                          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                            <Text style={styles.submitText}>Submit</Text>
                          </TouchableOpacity>
                        : 
                          isCorrect === true 
                          ? 
                            <View style={{width:'100%'}}> 
                              <Image source={checkmark} resizeMode='contain' style={styles.correctIcon}/>
                            </View>
                          :
                            <View style={{width: '100%'}}> 
                              <Image source={x} resizeMode='contain' style={styles.correctIcon}/>
                            </View>
      }
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
  },
  correctIcon: {
    width:'100%',
    height:'50%',
    alignSelf:'center',
  }
});

export default QuizCard;