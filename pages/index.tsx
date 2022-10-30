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
  Group,
  ActionIcon,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { MdPause, MdPlayArrow, MdStop } from "react-icons/md";
import update from "immutability-helper";

type ActiveActivity = {
  activityIndex: number;
  stop: boolean;
};

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
  const [activeActivities, setActiveActivities] = useState<ActiveActivity[]>(
    []
  );
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
        {activeActivities.map(({ activityIndex, stop }, index) => (
          <Group position="apart">
            {activities[activityIndex]}
            <Group>
              <ActionIcon
                onClick={() =>
                  setActiveActivities(
                    update(activeActivities, {
                      [index]: { stop: { $set: !stop } },
                    })
                  )
                }
              >
                {stop ? <MdPlayArrow /> : <MdPause />}
              </ActionIcon>
              <ActionIcon
                onClick={() =>
                  setActiveActivities(
                    activeActivities.filter((v, i) => i !== index)
                  )
                }
              >
                <MdStop />
              </ActionIcon>
            </Group>
          </Group>
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
              onClick={() =>
                setActiveActivities(
                  update(activeActivities, {
                    $push: [{ activityIndex: i, stop: false }],
                  })
                )
              }
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
