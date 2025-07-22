import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { supabase } from '@/lib/supabase'

export default function LogoutScreen() {

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if(error){
      Alert.alert(error)
    }
  }

  return (
    <View>
      <Button
          mode="contained"
          className="rounded-lg w-40"
          onPress={() => signOut()}
        >
          로그아웃
        </Button>
    </View>
  )
}

const styles = StyleSheet.create({})