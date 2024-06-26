import React, { useEffect } from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from "@/constants/images"
import CustomButton from '@/components/CustomButton/CustomButton'
import { StatusBar } from 'expo-status-bar'
import { Redirect, router } from 'expo-router'
import { useGlobalContex } from '@/context/GlobalProvider'
import { getCurrentUser } from '@/lib/appwrite'

const index = () => {
  const { isLoading, isLoggedIn, setIsLoggedIn } = useGlobalContex();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const session = await getCurrentUser()
        if (session) {
          setIsLoggedIn(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    verifySession()
  }, []);

  if (!isLoading && isLoggedIn) return <Redirect href={"/home"} />;

  return (
    <SafeAreaView className=' bg-bg_onboarding h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full justify-center items-center h-[85vh] px-4'>
          <Image
            source={images.logo}
            className='w-[280px] h-[84px]'
            resizeMode='contain'
          />
          <View className='relative mt-5'>
            <Text className='text-3xl text-white text-center font-bold'>
              Easily organize your events and collaborate with friends with {' '}
              <Text className='text-success'>
                BringAlong!
              </Text>
            </Text>

            <Image
              source={images.path}
              className='w-[200px] h-[15px] absolute -bottom-2 right-8'
              resizeMode='contain'
            />
          </View>

          <Text className='text-sm text-gray-100 mt-7 text-center font-light'>
            Create unique events, invite your friends, and together bring what you need. Make every gathering special!
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => { router.push('/sign-in') }}
            containerStyles='w-full mt-7'
          />
          <CustomButton
            title="Continue with event code"
            handlePress={() => { router.push('/enter-code') }}
            containerStyles='w-full mt-7 bg-gray-200 '
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}

export default index