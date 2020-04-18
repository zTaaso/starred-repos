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
    Loading,
} from './styles';

export default function User({ navigation, route }) {
    const { user } = route.params;
    const [stars, setStars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);

    navigation.setOptions({
        title: user.name,
    });

    async function getStarred(currentPage = 1) {
        const response = await api.get(`/users/${user.login}/starred`, {
            params: {
                page: currentPage,
            },
        });
        setStars(
            currentPage >= 2 ? [...stars, ...response.data] : response.data
        );
    }

    useEffect(() => {
        async function firstLoad() {
            setLoading(true);
            await getStarred(page);
            setLoading(false);
        }
        firstLoad();
    }, []);

    function handleRefresh() {
        setRefreshing(true);
        setPage(1);
        getStarred(page);
        setRefreshing(false);
    }

    function loadMore() {
        getStarred(page + 1);
        setPage(page + 1);
        console.log(page + 1);
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <Container>
                <Header>
                    <Avatar source={{ uri: user.avatar }} />
                    <Name>{user.name}</Name>
                    <Bio>{user.bio}</Bio>
                </Header>

                {loading ? (
                    <Loading />
                ) : (
                    <Stars
                        data={stars}
                        keyExtractor={(star) => String(star.id)}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        onEndReachedThreshold={0.2}
                        onEndReached={loadMore}
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
                )}
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
