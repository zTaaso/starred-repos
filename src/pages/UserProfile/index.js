import React from 'react';
import { WebView } from 'react-native-webview';

export default function UserProfile({ route, navigation }) {
    const { userUrl } = route.params;

    return (
        <WebView
            onLoad={() => {}}
            startInLoadingState={true}
            source={{ uri: userUrl }}
        />
    );
}
