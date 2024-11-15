import {
  Checkbox,
  Col,
  Collapse,
  // Divider,
  Form,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import stylesHistory from "./HistoryTab.module.scss";
import HistoryCard from "../HistoryCard/HistoryCard";

const { Title, Text } = Typography;
const { Panel } = Collapse;

export type BookingHistory = {
  id: string;
  pickup: string;
  destination: string;
  fare: number;
  date: string;
  status: string;
  distance: number;
};

const bookingList: BookingHistory[] = [
  {
    id: "1",
    pickup: "NTU",
    destination: "Changi Airport",
    fare: 39.5,
    date: "15/11/2024",
    status: "Cancelled",
    distance: 37.5,
  },
  {
    id: "2",
    pickup: "NTU",
    destination: "NUS",
    fare: 15.6,
    date: "12/11/2024",
    status: "Completed",
    distance: 14.1,
  },
  {
    id: "3",
    pickup: "NUS",
    destination: "Changi Airport",
    fare: 30.1,
    date: "13/11/2024",
    status: "Completed",
    distance: 27.6,
  },
];

const HistoryTab = () => {
  return (
    <Row gutter={[32, 8]}>
      <Col span={16}>
        <div className={stylesHistory.historySort}>
          <Space align="center">
            <Text strong>Sort by</Text>
            <Form.Item noStyle>
              <Select
                defaultValue={"asce"}
                allowClear
                options={[
                  {
                    label: "Ascending",
                    value: "asce",
                  },
                  {
                    label: "Descending",
                    value: "desc",
                  },
                ]}
              />
            </Form.Item>
          </Space>
        </div>
        {/* <HistoryCard /> */}
        {bookingList.map((trip) => (
          <HistoryCard
            key={trip.id}
            id={trip.id}
            pickup={trip.pickup}
            destination={trip.destination}
            fare={trip.fare}
            date={trip.date}
            status={trip.status}
            distance={trip.distance}
          />
        ))}
      </Col>
      <Col span={8}>
        <Title level={5}>Filter</Title>
        {/* <Collapse defaultActiveKey={["1"]} ghost>
          <Panel key="1" header={<Text strong>Payment Method</Text>}>
            <Form>
              <Form.Item>
                <Checkbox>Cash</Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox>Credit Card</Checkbox>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>

        <Divider /> */}

        <Collapse defaultActiveKey={["2"]} ghost>
          <Panel key="2" header={<Text strong>Trip Completion Status</Text>}>
            <Form>
              <Form.Item>
                <Checkbox>Completed</Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox>Cancelled</Checkbox>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default HistoryTab;
