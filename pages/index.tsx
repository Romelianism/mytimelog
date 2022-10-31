import {
  ActionIcon,
  AppShell,
  Aside,
  Burger,
  Button,
  Center,
  Group,
  Header,
  List,
  MediaQuery,
  ScrollArea,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import RealtimeDate from "components/RealtimeTime";
import update from "immutability-helper";
import { useRef, useState } from "react";
import { MdPause, MdPlayArrow, MdStop } from "react-icons/md";
import formatTimeHMS from "utils/formatTimeHMS";

type Activity = {
  activityTypeIndex: number;
  intervals: {
    start: Date;
    stop: Date | null;
  }[];
};
type ActiveActivity = {
  activityIndex: number;
  pause: boolean;
};
const activityTypes = [
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
export default function Page() {
  const theme = useMantineTheme();
  const [opened, toggleOpened] = useToggle();
  const [activeActivities, setActiveActivities] = useState<ActiveActivity[]>(
    []
  );
  const activities = useRef<Activity[]>([]); // to stop getting "TypeError: activities[activityIndex] is undefined" every rerender

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          paddingLeft: "calc(var(--mantine-aside-width, 0px) + 16px)",
          paddingRight: "calc(var(--mantine-navbar-width, 0px) + 16px)",
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        /* History */
        <Aside
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
          style={{ left: 0 }}
        >
          {/* History text */}
          <Text>History</Text>
          {/* Activities display */}
          <ScrollArea>
            <Stack>
              {activities.current
                .slice()
                .reverse() // reverse so newest ones are on top
                .map(({ activityTypeIndex, intervals }) => (
                  /* Invervals display */
                  <Stack>
                    {activityTypes[activityTypeIndex]}
                    <List>
                      {intervals
                        .slice()
                        .reverse() // reverse so newest ones are on top
                        .map(({ start, stop }) => (
                          /* Stop and start display */
                          <List.Item>
                            <Group position="apart">
                              <Stack>
                                {/* Stop display */}
                                <Text>
                                  Stop: {stop?.toUTCString() ?? "Now"}
                                </Text>
                                {/* Start display */}
                                <Text>Start: {start.toUTCString()}</Text>
                              </Stack>
                            </Group>
                          </List.Item>
                        ))}
                    </List>
                  </Stack>
                ))}
            </Stack>
          </ScrollArea>
        </Aside>
      }
      header={
        /* Header */
        <Header height={70} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            {/* History burger */}
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => toggleOpened()}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            {/* Title */}
            <Text>MyTextLog</Text>
          </div>
        </Header>
      }
    >
      {/* Active activities */}
      <Stack justify="flex-start" spacing="xs">
        {activeActivities
          .slice()
          .reverse() // reverse so newest ones are on top
          .map(({ activityIndex, pause }, index) => {
            index = activeActivities.length - 1 - index; // reverse index because index is from reversed copy of array
            const intervals = activities.current[activityIndex].intervals;
            const latestInterval = intervals[intervals.length - 1];

            return (
              /* Active Activity */
              <Group key={activityIndex} position="apart">
                <Group>
                  {/* Activity Type */}
                  <Text>
                    {
                      activityTypes[
                        activities.current[activityIndex].activityTypeIndex
                      ]
                    }
                  </Text>
                  {/* Indicator */}
                  <Text>
                    {latestInterval.stop === null ? (
                      /* Realtime indicator */
                      <RealtimeDate
                        format={(date) =>
                          formatTimeHMS(
                            date.valueOf() - intervals[0].start.valueOf()
                          )
                        }
                        ms={1000}
                      />
                    ) : (
                      /* Static indicator */
                      formatTimeHMS(
                        latestInterval.stop.valueOf() -
                          intervals[0].start.valueOf()
                      )
                    )}
                  </Text>
                </Group>
                {/* Pause and stop active activity */}
                <Group>
                  {/* Pause and unpause active activity */}
                  <ActionIcon
                    onClick={
                      pause
                        ? // unpause active activity
                          () => {
                            // create new interval
                            intervals.push({ start: new Date(), stop: null });

                            // set pause to false
                            setActiveActivities(
                              update(activeActivities, {
                                [index]: {
                                  pause: { $set: false },
                                },
                              })
                            );
                          }
                        : // pause active activity
                          () => {
                            // stop latest interval
                            latestInterval.stop = new Date();

                            // set pause to true
                            setActiveActivities(
                              update(activeActivities, {
                                [index]: {
                                  pause: { $set: true },
                                },
                              })
                            );
                          }
                    }
                  >
                    {pause ? <MdPlayArrow /> : <MdPause />}
                  </ActionIcon>
                  {/* Stop active activity */}
                  <ActionIcon
                    onClick={() => {
                      // stop latest interval if not already
                      latestInterval.stop ??= new Date();

                      // remove from active activities
                      setActiveActivities(
                        activeActivities.filter((v, i) => i !== index)
                      );
                    }}
                  >
                    <MdStop />
                  </ActionIcon>
                </Group>
              </Group>
            );
          })}
      </Stack>
      {/* Activity starts */}
      <SimpleGrid spacing={"xs"} cols={4}>
        {activityTypes.map((activity, i) => (
          /* Start new active activities */
          <MediaQuery
            key={activity}
            smallerThan="sm"
            styles={{ fontSize: 10, padding: 2 }}
          >
            <Button
              size="lg"
              variant="subtle"
              onClick={() => {
                // adds new activity
                activities.current.push({
                  activityTypeIndex: i,
                  intervals: [{ start: new Date(), stop: null }],
                });

                // adds new active activity with index being the latest activity
                setActiveActivities(
                  update(activeActivities, {
                    $push: [
                      {
                        activityIndex: activities.current.length - 1,
                        pause: false,
                      },
                    ],
                  })
                );
              }}
            >
              {/* Activity type */}
              <Stack justify="flex-start" spacing="xs">
                {/* Activity type icon */}
                <Center>
                  <Skeleton height={20} circle />
                </Center>
                {/* Activity type name */}
                {activity}
              </Stack>
            </Button>
          </MediaQuery>
        ))}
      </SimpleGrid>
    </AppShell>
  );
}
