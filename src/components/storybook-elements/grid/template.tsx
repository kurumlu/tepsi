import * as React from 'react';
import { Container, ContainerType } from '../../01-settings';
import { Column } from '../../01-settings/grid/column/Column';

export const grid1 = (
  <Container type={ContainerType.FLUID}>
    <Column grid={1} mobile={12} mobileLarge={6} tablet={3}>
      grid-1
    </Column>
    <Column grid={1} mobile={12} mobileLarge={6} tablet={3}>
      grid-1
    </Column>
    <Column grid={1} mobile={12} mobileLarge={6} tablet={3}>
      grid-1
    </Column>
    <Column grid={1} mobile={12} mobileLarge={6} tablet={3}>
      grid-1
    </Column>
    <Column grid={1} mobile={12} mobileLarge={6} tablet={3}>
      grid-1
    </Column>
    <Column grid={1} mobile={12} mobileLarge={6} tablet={3}>
      grid-1
    </Column>
    <Column grid={1} mobile={12} mobileLarge={6} tablet={3}>
      grid-1
    </Column>
    <Column grid={1} mobile={12} mobileLarge={6} tablet={3}>
      grid-1
    </Column>
    <Column grid={1} mobile={12} mobileLarge={6} tablet={3}>
      grid-1
    </Column>
    <Column grid={1} mobile={12} mobileLarge={6} tablet={3}>
      grid-1
    </Column>
    <Column grid={1} mobile={12} mobileLarge={6} tablet={3}>
      grid-1
    </Column>
    <Column grid={1} mobile={12} mobileLarge={6} tablet={3}>
      grid-1
    </Column>
  </Container>
);

export const grid2 = (
  <Container type={ContainerType.FLUID}>
    <Column grid={2} mobile={12} mobileLarge={6} tablet={2}>
      grid-2
    </Column>
    <Column grid={2} mobile={12} mobileLarge={6} tablet={2}>
      grid-2
    </Column>
    <Column grid={2} mobile={12} mobileLarge={6} tablet={2}>
      grid-2
    </Column>
    <Column grid={2} mobile={12} mobileLarge={6} tablet={2}>
      grid-2
    </Column>
    <Column grid={2} mobile={12} mobileLarge={6} tablet={2}>
      grid-2
    </Column>
    <Column grid={2} mobile={12} mobileLarge={6} tablet={2}>
      grid-2
    </Column>
  </Container>
);

export const grid3 = (
  <Container type={ContainerType.FLUID}>
    <Column grid={3} mobile={12} mobileLarge={6} tablet={3}>
      grid-3
    </Column>
    <Column grid={3} mobile={12} mobileLarge={6} tablet={3}>
      grid-3
    </Column>
    <Column grid={3} mobile={12} mobileLarge={6} tablet={3}>
      grid-3
    </Column>
    <Column grid={3} mobile={12} mobileLarge={6} tablet={3}>
      grid-3
    </Column>
  </Container>
);

export const grid4 = (
  <Container type={ContainerType.FLUID}>
    <Column grid={4} mobile={12} mobileLarge={4}>
      grid-4
    </Column>
    <Column grid={4} mobile={12} mobileLarge={4}>
      grid-4
    </Column>
    <Column grid={4} mobile={12} mobileLarge={4}>
      grid-4
    </Column>
  </Container>
);

export const grid6 = (
  <Container type={ContainerType.FLUID}>
    <Column grid={6}>grid-6</Column>
    <Column grid={6}>grid-6</Column>
  </Container>
);

export const grid12 = (
  <Container type={ContainerType.FLUID}>
    <Column>Header grid-12</Column>
    <Column grid={8} mobile={12}>
      Content grid-8 grid-mobile-12
    </Column>
    <Column grid={4} mobile={12}>
      Sidebar grid-4 grid-mobile-12
    </Column>
  </Container>
);
