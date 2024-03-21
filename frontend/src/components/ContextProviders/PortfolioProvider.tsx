import { useCallback, useContext, useEffect, useState } from "react";
import { Selection } from "@nextui-org/react";
import PortfolioContext from "../../store/ProtfolioContext";
import { PortfolioContextType, PortfolioFormType, PortfolioSnapshot, PortfolioType } from "../../types";
import AuthContext from "../../store/AuthContext";
import BASE_URL from "../../http";


type PortfolioProviderProps = {
  children: React.ReactNode;
};

const PortfolioProvider = ({ children }: PortfolioProviderProps) => {
  const [portfolios, setPortfolios] = useState<PortfolioType[]>([])
  const [portfolioSnapshots, setPortfolioSnapshots] = useState<PortfolioSnapshot[]>([])
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>();
  const [visibleColumns, setVisibleColumns] = useState<Selection>("all");

  const { authTokens } = useContext(AuthContext);


  const fetchPortfolios = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/portfolios/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens?.access,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPortfolios(data);
      } else {
        throw new Error("Failed to fetch portfolios");
      }
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  }, [authTokens?.access]);

  const addPortfolio = useCallback(async (submittedPortfolio: PortfolioFormType) => {
    try {
      const response = await fetch(`${BASE_URL}/api/portfolios/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens?.access,
        },
        body: JSON.stringify(submittedPortfolio),
      });
      if (response.ok) {
        const data = await response.json();
        setPortfolios([...portfolios, data]);
      } else {
        throw new Error("Failed to add portfolio");
      }
    } catch (error) {
      console.error("Error adding portfolio:", error);
    }
  }, [authTokens?.access, portfolios]);

  const editPortfolio = useCallback(async (submittedPortfolio: PortfolioFormType) => {
    try {
      const response = await fetch(`${BASE_URL}/api/portfolios/${selectedPortfolio}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens?.access,
        },
        body: JSON.stringify(submittedPortfolio),
      });
      if (response.ok) {
        const data = await response.json();
        setPortfolios((prevState) => {
          return prevState.map((p) =>
            p.id === selectedPortfolio ? data : p
          )
        });
      } else {
        throw new Error("Failed to edit portfolio");
      }
    } catch (error) {
      console.error("Error editing portfolio:", error);
    }
  }, [authTokens?.access, selectedPortfolio]);

  const deletePortfolio = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/portfolios/${selectedPortfolio}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens?.access,
        },
      });
      if (response.ok) {
        setPortfolios((prevState) => prevState.filter((p) => p.id !== selectedPortfolio));
        setSelectedPortfolio(undefined)
      } else {
        throw new Error("Failed to delete portfolio");
      }
    } catch (error) {
      console.error("Error deleting portfolio:", error);
    }
  }, [authTokens?.access, selectedPortfolio]);

  const fetchPortfolioSnapshots = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/portfolios/${selectedPortfolio}/snapshots/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens?.access,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPortfolioSnapshots(data)
      } else {
        throw new Error("Failed to fetch portfolio snapshots");
      }
    } catch (error) {
      console.error("Error fetching portfolio snapshots:", error);
    }
  }, [authTokens?.access, selectedPortfolio]);



  useEffect(() => {
    fetchPortfolios()
  }, [fetchPortfolios])

  useEffect(() => {
    if (portfolios.length > 0 && selectedPortfolio === undefined) {
      setSelectedPortfolio(portfolios[0].id!.toString());
    }
  }, [portfolios.length]);


  const contextData: PortfolioContextType = {
    portfolios,
    selectedPortfolio,
    visibleColumns,
    portfolioSnapshots,
    setPortfolioSnapshots,
    setVisibleColumns,
    setPortfolios,
    fetchPortfolios,
    setSelectedPortfolio,
    addPortfolio,
    editPortfolio,
    deletePortfolio,
    fetchPortfolioSnapshots,
  };

  return (
    <PortfolioContext.Provider value={contextData}>
      {children}
    </PortfolioContext.Provider>
  );
}


export default PortfolioProvider