import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import { StatusBar } from 'react-native';

import api from '../../services/api';

import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Stars,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author,
} from './styles';

export default function User({ navigation, route }) {
    const { user } = route.params;
    const [stars, setStars] = useState([]);

    navigation.setOptions({
        title: user.name,
    });

    useEffect(() => {
        async function getStarred() {
            const response = await api.get(`/users/${user.login}/starred`);

            setStars([...response.data]);
        }
        getStarred();
    }, []);

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <Container>
                <Header>
                    <Avatar source={{ uri: user.avatar }} />
                    <Name>{user.name}</Name>
                    <Bio>{user.bio}</Bio>
                </Header>

                <Stars
                    data={stars}
                    keyExtractor={(star) => String(star.id)}
                    renderItem={({ item }) => (
                        <Starred>
                            <OwnerAvatar
                                source={{ uri: item.owner.avatar_url }}
                            />
                            <Info>
                                <Title>{item.name}</Title>
                                <Author>{item.owner.login}</Author>
                            </Info>
                        </Starred>
                    )}
                />
            </Container>
        </>
    );
}

User.propTypes = {
    navigation: Proptypes.shape({
        setOptions: Proptypes.func,
        navigate: Proptypes.func,
    }).isRequired,
    route: Proptypes.shape({
        params: Proptypes.object,
    }).isRequired,
};
