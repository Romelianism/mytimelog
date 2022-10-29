import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Col,
  Grid,
  SimpleGrid,
  Container,
  Stack,
  Button,
  Skeleton,
  Center,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";

export default function Page() {
  const theme = useMantineTheme();
  const [opened, toggleOpened] = useToggle();
  const activities = [
    "Sleep",
    "Transport",
    "Eat",
    "Sport",
    "Read",
    "Work",
    "Shop",
    "Entertainment",
    "Schoolwork",
    "Cinema",
    "Walk",
    "Study",
    "Internet",
    "Bath",
    "Class",
    "Mix",
    "Family Time",
    "Phone Work",
    "Waiting",
    "Trip",
    "Black",
    "Gaming",
    "Nan",
    "Relax",
    "Thinking",
    "Prep",
    "Toilet",
  ];
  const [activeActivities, setActiveActivities] = useState<Number[]>([]);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => toggleOpened()}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>MyTextLog</Text>
          </div>
        </Header>
      }
    >
      <Stack justify="flex-start" spacing="xs">
        {activeActivities.map((activeActivity) => (
          <Button variant="outline">{activities[activeActivity]}</Button>
        ))}
      </Stack>

      <SimpleGrid spacing={"xs"} cols={4}>
        {activities.map((activity, i) => (
          <MediaQuery
            key={activity}
            smallerThan="sm"
            styles={{ fontSize: 10, padding: 2 }}
          >
            <Button
              size="lg"
              variant="subtle"
              onClick={() => setActiveActivities([...activeActivities, i])}
            >
              <Stack justify="flex-start" spacing="xs">
                <Center>
                  <Skeleton height={20} circle />
                </Center>
                {activity}
              </Stack>
            </Button>
          </MediaQuery>
        ))}
      </SimpleGrid>
    </AppShell>
  );
}
