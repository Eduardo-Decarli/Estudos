package com.decarli.loginjetpackcomposable

import android.app.Activity
import android.content.Intent
import android.graphics.Paint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.retain.RetainedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.core.graphics.createBitmap
import com.decarli.loginjetpackcomposable.ui.theme.LoginJetpackComposableTheme
import kotlinx.coroutines.delay

class IntroComposable : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            LoginJetpackComposableTheme {
                TelaSplash(this)
            }
        }
    }
}

@Composable
private fun TelaSplash(activity : ComponentActivity) {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center

    ) {
        Image(
            modifier = Modifier.fillMaxSize(),
            painter = painterResource(R.drawable.slash_cape),
            contentDescription = "Uma tela de splash",
            contentScale = ContentScale.Crop
        )
        Text(
            text = "Food Hub"
        )
    }
    LaunchedEffect(Unit) {
        delay(3000)
        navigateToMainActivity(activity);
    }
}

@Preview(showBackground = true)
@Composable
fun TelaSplashPreview() {
    LoginJetpackComposableTheme{
        TelaSplash(ComponentActivity())
    }
}

fun navigateToMainActivity(activity : ComponentActivity) {
    var intent = Intent(activity, MainActivity::class.java);
    activity.startActivity(intent);
    activity.finish()
}


