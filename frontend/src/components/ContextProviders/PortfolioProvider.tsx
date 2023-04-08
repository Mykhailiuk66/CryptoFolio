import { useCallback, useContext, useEffect, useState } from "react";
import { Selection, useDisclosure } from "@nextui-org/react";
import PortfolioContext from "../../store/ProtfolioContext";
import { PortfolioContextType, PortfolioFormType, PortfolioHoldingForm, PortfolioModalState, PortfolioSnapshot, PortfolioType } from "../../types";
import AuthContext from "../../store/AuthContext";



type PortfolioProviderProps = {
  children: React.ReactNode;
};

const PortfolioProvider = ({ children }: PortfolioProviderProps) => {
  const [portfolios, setPortfolios] = useState<PortfolioType[]>([])
  const [portfolioSnapshots, setPortfolioSnapshots] = useState<PortfolioSnapshot[]>([])
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>();
  const [selectedPortfolioHolding, setSelectedPortfolioHolding] = useState<string>();
  const [visibleColumns, setVisibleColumns] = useState<Selection>("all");
  const [modalState, setModalState] = useState<PortfolioModalState>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { authTokens } = useContext(AuthContext);

  const fetchPortfolios = useCallback(async () => {
    try {
      const response = await fetch(`/api/portfolios/`, {
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
      const response = await fetch(`/api/portfolios/`, {
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
      const response = await fetch(`/api/portfolios/${selectedPortfolio}/`, {
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
      const response = await fetch(`/api/portfolios/${selectedPortfolio}/`, {
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
      const response = await fetch(`/api/portfolios/${selectedPortfolio}/snapshots/`, {
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

  const removePortfolioHolding = useCallback(async (portfolioHoldingId: string) => {
    try {
      const response = await fetch(`/api/portfolio-holdings/${portfolioHoldingId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens?.access,
        },
      });
      if (response.ok) {
        setPortfolios((prevState) => {
          return prevState.map((p) => {
            return p.id !== selectedPortfolio ?
              {
                ...p,
                holdings: [...p.holdings!],
              } :
              {
                ...p,
                holdings: p.holdings?.filter((ph) => ph.id !== portfolioHoldingId)
              }
          })
        })
      } else {
        throw new Error("Failed to delete portfolio");
      }
    } catch (error) {
      console.error("Error deleting portfolio:", error);
    }
  }, [authTokens?.access, selectedPortfolio]);

  const addPortfolioHolding = useCallback(async (formData: PortfolioHoldingForm) => {
    try {
      const response = await fetch(`/api/portfolio-holdings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens?.access,
        },
        body: JSON.stringify({ ...formData, portfolio: selectedPortfolio }),
      });
      if (response.ok) {
        setPortfolios([])
      } else {
        throw new Error("Failed to add portfolio holding");
      }
    } catch (error) {
      console.error("Error adding portfolio holding:", error);
    }
  }, [authTokens?.access, selectedPortfolio]);

  const editPortfolioHolding = useCallback(async (formData: PortfolioHoldingForm, holdingId: string) => {
    try {
      const response = await fetch(`/api/portfolio-holdings/${holdingId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens?.access,
        },
        body: JSON.stringify({ ...formData, portfolio: selectedPortfolio }),
      });
      if (response.ok) {
        setPortfolios([])
      } else {
        throw new Error("Failed to edit portfolio holding");
      }
    } catch (error) {
      console.error("Error editting portfolio holding:", error);
    }
  }, [authTokens?.access, selectedPortfolio]);


  useEffect(() => {
    if (portfolios.length === 0) {
      fetchPortfolios()
    }
  }, [fetchPortfolios, portfolios.length])

  useEffect(() => {
    if (portfolios.length > 0 && selectedPortfolio === undefined) {
      setSelectedPortfolio(portfolios[0].id!.toString());
    }
  }, [portfolios, portfolios.length, selectedPortfolio]);


  const contextData: PortfolioContextType = {
    portfolios,
    selectedPortfolio,
    visibleColumns,
    portfolioSnapshots,
    selectedPortfolioHolding,
    modalState,
    setModalState,
    setSelectedPortfolioHolding,
    setPortfolioSnapshots,
    setVisibleColumns,
    setSelectedPortfolio,
    addPortfolio,
    editPortfolio,
    deletePortfolio,
    fetchPortfolioSnapshots,
    removePortfolioHolding,
    addPortfolioHolding,
    editPortfolioHolding,
    isOpen,
    onOpen,
    onOpenChange
  };

  return (
    <PortfolioContext.Provider value={contextData}>
      {children}
    </PortfolioContext.Provider>
  );
}


export default PortfolioProvider