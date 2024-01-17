import styled from 'styled-components';
import { variables, mixins } from '@splunk/themes';

const StyledContainerPage = styled.div`
    ${mixins.reset('inline-block')};
    font-size: ${variables.fontSizeLarge};
    line-height: 200%;
    margin: 0;
    padding: 0;
    width: 98vw; /* Width equal to viewport width */
    height: 100vh; /* Height equal to viewport height */
    border-radius: ${variables.borderRadius};
    box-shadow: ${variables.overlayShadow};
    background-color: ${variables.cat14Color}; /* Assuming 'creamColor' is defined in the theme */
`;

const StyledGreetingPage = styled.div`
    font-weight: bold;
    color: ${variables.brandColor};
    font-size: ${variables.fontSizeXXLarge};
`;

export { StyledContainerPage, StyledGreetingPage };
