import React from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

export default function Repository({ route }) {
    const { url } = route.params;

    return <WebView source={{ uri: url }} />;
}

Repository.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            url: PropTypes.string,
        }),
    }).isRequired,
};
