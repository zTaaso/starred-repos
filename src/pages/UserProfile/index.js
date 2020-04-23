import React from 'react';
import { WebView } from 'react-native-webview';

export default function UserProfile({ route }) {
    const { userUrl } = route.params;

    return <WebView source={{ uri: userUrl }} />;
}
