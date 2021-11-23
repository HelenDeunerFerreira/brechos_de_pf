import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"
import { storageSave, storageRemove, storageGet } from './Storage'

const firebaseConfig = {
  apiKey: "AIzaSyCrf02fVpkSSjYvOn5fVL0iegxt9yJf9GU",
  authDomain: "mapabrechospf.firebaseapp.com",
  projectId: "mapabrechospf",
  storageBucket: "mapabrechospf.appspot.com",
  messagingSenderId: "131498397293",
  appId: "1:131498397293:web:fc14c112edd86bd12eb964"
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((usuario) => {
        storageSave("TOKEN_KEY", usuario.user.uid)
        resolve(true)
      })
      .catch((error) => {
        storageRemove("TOKEN_KEY")
        let erro = error.code
        if (erro === "auth/wrong-password")
          reject("Usuário ou Senha Inválidos")
        else
          reject("Algo deu errado!")
      })
  })
}

export const sigin = (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        resolve("Usuário Registrado!")
      })
      .catch(() => {
        reject("Usuário já inserido no banco!")
      })
  })
}

export const logoff = () => {
  return new Promise((resolve, reject) => {
    storageRemove("TOKEN_KEY")
    signOut(auth).then(() => {
      resolve()
    }).catch((error) => {
      reject()
    });
  })
}

export const saveBrechos = (brecho, Geocode) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(brecho)

      Geocode.fromAddress(brecho.endereco).then(
        async (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          brecho.lat = lat
          brecho.lng = lng
          await addDoc(collection(db, "brechos"), brecho);
          resolve()
        },
        (error) => {
          reject("Endereço incorreto!")
        }
      );

    } catch (error) {
      reject(error)
    }
  })
}

export const deleteBrechos = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteDoc(doc(db, 'brechos', id));
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export const getBrechos = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const querySnapshot = await getDocs(collection(db, "brechos"));
      let dados = []
      querySnapshot.forEach((doc) => {
        dados.push({
          id: doc.id,
          nome: doc.data().nome,
          endereco: doc.data().endereco,
          descricao: doc.data().descricao,
          lat: doc.data().lat,
          lng: doc.data().lng,
        })
      });
      resolve(dados)
    } catch (error) {
      reject(error)
    }
  })
}

export const getContatos = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const querySnapshot = await getDocs(collection(db, "contatos"));
      let dados = []
      querySnapshot.forEach((doc) => {
        dados.push({
          id: doc.id,
          assunto: doc.data().assunto,
          mensagem: doc.data().mensagem,
        })
      });
      resolve(dados)
    } catch (error) {
      reject(error)
    }
  })
}

export const isAuthenticated = () => storageGet("TOKEN_KEY") !== null;
export const getToken = () => storageGet("TOKEN_KEY")


