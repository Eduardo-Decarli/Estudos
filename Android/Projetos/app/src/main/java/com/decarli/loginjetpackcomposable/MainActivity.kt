package com.decarli.loginjetpackcomposable

import android.content.res.Resources
import android.os.Bundle
import android.text.style.BackgroundColorSpan
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Label
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.decarli.loginjetpackcomposable.ui.theme.LoginJetpackComposableTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            LoginJetpackComposableTheme {
                LoginScreen()
            }
        }
    }
}

@Preview()
@Composable
fun LoginScreen() {

    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var passwordVisible by rememberSaveable { mutableStateOf(false) }

    Column(
        modifier = Modifier.fillMaxSize()
            .background(Color.White)
            .padding(35.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Image(
            painterResource(R.drawable.salada_frutas),
            contentDescription = "Salada de Frutas"
        )
        Text(
            text = "Bem Vindo ao seu Livro de Receitas",
            textAlign = TextAlign.Center,
            fontSize = 32.sp,
            fontStyle = FontStyle.Italic,
            fontWeight = FontWeight.Bold,
            color = Color.Green
        )
        UserTextField(email) { email = it }
        PasswordTextField(password, passwordVisible) { password = it }
        Button(
            onClick = {},
            modifier = Modifier
                .fillMaxWidth()
                .height(66.dp)
                .padding(horizontal = 64.dp, vertical = 8.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFF4CAF50)
            ),
            shape = RoundedCornerShape(50)
        ) {
            Text(
                text = "Login",
                fontSize = 20.sp,
                color = Color.White,
                fontWeight = FontWeight.Bold
            )
        }
        Button(
            onClick = {},
            modifier = Modifier
                .fillMaxWidth()
                .height(66.dp)
                .padding(horizontal = 64.dp, vertical = 8.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFF4CAF50)
            ),
            shape = RoundedCornerShape(50)
        ) {
            Text(
                text = "Register",
                fontSize = 20.sp,
                color = Color.White,
                fontWeight = FontWeight.Bold
            )
        }
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp),
            horizontalArrangement = Arrangement.SpaceEvenly

        ) {
            MediaLogin(R.drawable.google)
            MediaLogin(R.drawable.facebook)
            MediaLogin(R.drawable.linkedin)

        }
    }
}

@Composable
fun PasswordTextField(value : String, passwordVisibility : Boolean,onValueChange: (String) -> Unit) {
    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        modifier = Modifier
            .fillMaxWidth()
            .height(66.dp)
            .padding(horizontal = 64.dp, vertical = 8.dp),
        shape = RoundedCornerShape(50),
        textStyle = TextStyle(
            textAlign = TextAlign.Center,
            color = Color(0xFF4CAF50),
            fontSize = 14.sp
        ),
        placeholder = {Text(
            text = "Password", textAlign = TextAlign.Center
        )}
    )
}

@Composable
fun UserTextField(value : String, onValueChange: (String) -> Unit) {
    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        modifier = Modifier
            .fillMaxWidth()
            .height(66.dp)
            .padding(horizontal = 64.dp, vertical = 8.dp),
        shape = RoundedCornerShape(50),
        textStyle = TextStyle(
            textAlign = TextAlign.Center,
            color = Color(0xFF4CAF50),
            fontSize = 14.sp
        ),
        placeholder = {Text(
            text = "Usuário", textAlign = TextAlign.Center
        )}
    )
}

@Composable()
fun MediaLogin(resource : Int) {
    Image(
        painterResource(id = resource),
        contentDescription = null,
        modifier = Modifier
            .width(50.dp)
    )
}