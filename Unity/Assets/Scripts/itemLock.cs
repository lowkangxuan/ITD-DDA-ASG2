using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class itemLock : MonoBehaviour
{
    public enum Components { Screw, cpu , ram, ssd,fan}

    public Components Component;
    [Header ("Other component")]
    public GameObject ItemAni;

    public GameObject ItemModel;
    [Header("Screw")]
    public GameObject screwComponent;
    //if needed
    public GameObject ItemCol;

    //if needed
    public GameObject RotateScrew;

    private bool screwTrue = false;
    private bool cpuTrue = false;
    private bool ramTrue = false;
    private bool ssdTrue = false;
    private bool fanTrue = false;
    public GameObject speedRunManager;
    public bool speedRun = false;

    private void Start()
    {
        if (speedRunManager.activeInHierarchy)
        {
            speedRun = speedRunManager.GetComponent<SpeedRunManager>().speedRun;
        }
    }

    void Update()
    {
        switch (Component)
        {
            case Components.Screw:
                screwTrue = true;
                break;
            case Components.cpu:
                cpuTrue = true;
                break;
            case Components.ram:
                ramTrue = true;
                break;
            case Components.ssd:
                ssdTrue = true;
                break;
            case Components.fan:
                fanTrue = true;
                break;
        }
    }
    private void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.tag == "Screw" && screwTrue == true)
        {
            ItemCol.GetComponent<ScrewInteract>().enabled=true;
            ItemAni.SetActive(true);
            
            ItemModel.SetActive(false);
            this.gameObject.SetActive(false);
            if (speedRun)
            {
                speedRunManager.GetComponent<SpeedRunManager>().Screwed();
            }
        }
        if (collision.gameObject.tag == "Cpu" && cpuTrue == true)
        {
            //ItemCol.GetComponent<ScrewInteract>().enabled = true;
            ItemAni.SetActive(true);

            ItemModel.SetActive(false);
            this.gameObject.SetActive(false);
            if (speedRun)
            {
                speedRunManager.GetComponent<SpeedRunManager>().CPU();
            }
        }
        if (collision.gameObject.tag == "Ram" && ramTrue == true)
        {
            //ItemCol.GetComponent<ScrewInteract>().enabled = true;
            ItemAni.SetActive(true);

            ItemModel.SetActive(false);
            this.gameObject.SetActive(false);
            if (speedRun)
            {
                speedRunManager.GetComponent<SpeedRunManager>().RAM();
            }
        }
        if (collision.gameObject.tag == "Ssd" && ssdTrue == true)
        {
            //ItemCol.GetComponent<ScrewInteract>().enabled = true;
            ItemAni.SetActive(true);

            ItemModel.SetActive(false);
            this.gameObject.SetActive(false);
            screwComponent.SetActive(true);
            if (speedRun)
            {
                //change accordingly
                //speedRunManager.GetComponent<SpeedRunManager>().RAM();
            }
        }
        if (collision.gameObject.tag == "Fan" && fanTrue == true)
        {
            //ItemCol.GetComponent<ScrewInteract>().enabled = true;
            ItemAni.SetActive(true);

            ItemModel.SetActive(false);
            this.gameObject.SetActive(false);
            screwComponent.SetActive(true);
            if (speedRun)
            {
                //change accordingly
                //speedRunManager.GetComponent<SpeedRunManager>().RAM();
            }
        }
    }

}
