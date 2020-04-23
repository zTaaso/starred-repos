import React from 'react';
import { WebView } from 'react-native-webview';

export default function UserProfile({ route }) {
    const { userUrl } = route.params;
    console.log(userUrl);

    return <WebView source={{ uri: userUrl }} />;
}
