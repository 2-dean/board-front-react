import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function TabContainer() {
    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const existingTab = tabs.find((tab) => tab.path === location.pathname);
        if (!existingTab && location.pathname !== "/") {
            setTabs((prevTabs) => [...prevTabs, { id: location.pathname, name: location.pathname, path: location.pathname }]);
            setActiveTab(location.pathname);
        }
    }, [location.pathname]);

    const handleCloseTab = (tabPath) => {
        setTabs((prevTabs) => prevTabs.filter((tab) => tab.path !== tabPath));
        if (activeTab === tabPath) {
            setActiveTab(tabs.length > 1 ? tabs[tabs.length - 2].path : null);
        }
    };

    return (
        <div className="flex-1 p-4">
            <Tabs value={activeTab || ""} onValueChange={setActiveTab}>
                <TabsList>
                    {tabs.map((tab) => (
                        <div key={tab.id} className="flex items-center">
                            <TabsTrigger value={tab.path}>{tab.name}</TabsTrigger>
                            <Button size="icon" variant="ghost" onClick={() => handleCloseTab(tab.path)}>
                                <X size={14} />
                            </Button>
                        </div>
                    ))}
                </TabsList>
                {tabs.map((tab) => (
                    <TabsContent key={tab.id} value={tab.path}>
                        <Card className="p-4">Content for {tab.name}</Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
