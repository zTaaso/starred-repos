import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    padding: 30px;
`;

export const Form = styled.View`
    flex-direction: row;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#999',
})`
    flex: 1;
    height: 40px;
    background: #eee;
    padding: 0 15px;
    border-radius: 7px;
    border: 1px solid #dde;
`;

export const SubmitButton = styled(RectButton)`
    justify-content: center;
    align-items: center;
    background: #7159c1;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 12px;
    opacity: ${(props) => (props.loading ? 0.5 : 1)};
`;

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})`
    margin-top: 20px;
`;

export const User = styled.View`
    align-items: center;
    margin: 0 20px 30px;
`;

export const Avatar = styled.Image`
    width: 64px;
    height: 64px;
    border-radius: 32px;
    background: #eee;
`;

export const Name = styled.Text`
    font-size: 14px;
    color: #333;
    font-weight: bold;
    margin-top: 5px;
    text-align: center;
`;

export const Bio = styled.Text`
    font-size: 13px;
    line-height: 18px;
    color: #999;
    margin-top: 5px;
    text-align: center;
`;

export const ProfileButton = styled(RectButton)`
    flex: 1;
    margin-top: 10px;
    align-self: stretch;
    border-radius: 4px;
    background: #7159c1;
    justify-content: center;
    align-items: center;
    height: 36px;
`;

export const ProfileButtonText = styled.Text`
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
`;

export const DeleteButton = styled(RectButton)`
    background: red;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    margin-top: 10px;
    border-radius: 4px;
    margin-left: 5px;
    flex: 0.2;
`;

export const Buttons = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
