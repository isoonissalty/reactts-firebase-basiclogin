import React, { useState } from 'react';
import firebase, { db } from './firebase'

import { Login } from './Login'
import { Profile } from './Profile'
import { Button } from './components/Button';

import { Container, Grid } from "@material-ui/core"

interface User {
  uid: string;
  username: string;
  email: string;
  role: string;
}

function App() {
  const auth = firebase.auth()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [user, setUser] = useState<User>({
    uid: '',
    username: '',
    email: '',
    role: ''
    //for more user info
  })


  const handleEmailSignin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(handleResponse)
  }

  const handleResponse = async (response: firebase.auth.UserCredential) => {
    let uid: string | null = response.user!.uid
    console.log(response.additionalUserInfo?.profile)
    if (response.additionalUserInfo?.isNewUser) {
      let userInfo: any = response.additionalUserInfo.profile
      let name = userInfo.name
      let data = {
        username: name,
        email: response.user!.email,
        role: 'user'
      }
      await db.collection('users').doc(uid).set(data)
    }
    let doc = await db.collection('users').doc(uid).get()
    let user = doc.data() || { email: '', username: '' }
    setUser({
      uid: uid,
      username: user.username,
      email: user.email,
      role: user.role
    })
  }

  const handleFacebookSignin = () => {
    let provider = new firebase.auth.FacebookAuthProvider()

    auth.signInWithPopup(provider)
      .then(handleResponse)
  }

  const handleGoogleSignin = () => {
    let provider = new firebase.auth.GoogleAuthProvider()

    auth.signInWithPopup(provider)
      .then(handleResponse)

  }

  const handleSignout = () => {
    auth.signOut()
    setUser({
      uid: '',
      username: '',
      email: '',
      role: ''
    })
  }

  interface ProfilePayload {
    name: string;
    value: string;
  }

  const handleChangeProfile = (payload: ProfilePayload) => {
    if (payload.name !== 'email') {
      let temp = user
      temp = {
        ...temp,
        [payload.name]: payload.value
      }
      setUser(temp)
    }
  }

  const handleSubmitChangeProfile = async () => {
    const batch = db.batch()
    let doc = await db.collection('users').doc(user.uid)
    batch.set(doc, { username: user.username, email: user.email })
    await batch.commit()
    alert('username change successfully')
  }

  const handleDeleteUser = async () => {
    await db.collection('users').doc(user.uid).delete();
    let currentUser = auth.currentUser
    await currentUser!.delete()
    alert('username delete successfully')
    handleSignout()
    window.location.reload()
  }

  return (
    <Container maxWidth="sm">
      {
        user.uid === '' ?
          <Login
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            handleEmailSignin={handleEmailSignin}
            handleFacebookSignin={handleFacebookSignin}
            handleGoogleSignin={handleGoogleSignin}
          /> :
          <Grid container direction="column" justify="center" alignItems="center">
            <Profile user={user} onChangeProfile={handleChangeProfile} />
            <Button title="save change" onClick={handleSubmitChangeProfile} />
            <Button title="delete user" onClick={handleDeleteUser} />
            <Button title="log out" onClick={handleSignout} />
          </Grid>
      }
    </Container>
  );
}

export default App;
