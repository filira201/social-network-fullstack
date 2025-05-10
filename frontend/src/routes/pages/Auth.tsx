import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import { useState } from "react";
import type { AuthKeys } from "../../lib";
import { Login, Register } from "../../components";

const Auth = () => {
  const [selected, setSelected] = useState<AuthKeys>("login");

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="max-w-full w-[300px] h-[450px] sm:w-[340px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              selectedKey={selected}
              onSelectionChange={(key) => setSelected(key as AuthKeys)}
            >
              <Tab key={"login"} title="Вход">
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key={"sign-up"} title="Регистрация">
                <Register setSelected={setSelected} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
